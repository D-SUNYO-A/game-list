import { eventBus } from "../services/EventBus.js";
import { gameService } from "../services/GameService.js";
import { url } from "../utils/prod.env.js"

export class GameListComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });

        this.games = []; // Liste de jeux existante
        this.isLoading = false; // Pour éviter les chargements simultanés
        this.currentUrl = url;
        this.searchResults = null; // Résultats de recherche

        this.render();
        this.initialGameList(this.currentUrl);
        this.loaderNextGameList();
        this.setupScrollListener(); // Mettez en place l'écouteur de défilement
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Ajoutez un écouteur pour l'événement personnalisé 'searchResultsReady'
        eventBus.register('searchResultsReady', (searchResults) => {
            // Mettez à jour la liste des jeux avec les résultats de recherche
            this.searchResults = searchResults;
            this.updateGameList();
            this.root.querySelector(".more-loader").style.display = 'none';
        });
    }

    async loadGame(url) {
        if (this.isLoading) {
            return; // Évitez de lancer un chargement si un chargement est en cours
        }
        this.isLoading = true;
        const nextUrl = await gameService.getNextUrl(url);
        const newGames = await gameService.getGameData(nextUrl);
        this.currentUrl = nextUrl;
        this.games = [...this.games, ...newGames]; // Ajoutez les nouvelles données à la liste existante
        this.updateGameList(); // Mettez à jour l'affichage de la liste
        this.isLoading = false;
    }

    async initialGameList(url) {
        const games = await gameService.getGameData(url);
        this.games = games;

        this.updateGameList();
    }

    updateGameList() {
        const gameList = this.root.getElementById("game-list");
        gameList.innerHTML = '';

        if(this.searchResults === null) {
            this.games.forEach(game => {
                const gameCard = document.createElement('app-card');
                gameCard.data = game;
                gameList.appendChild(gameCard);
            });
        } else {
            this.searchResults.detail.forEach(game => {
                const gameCard = document.createElement('app-card');
                gameCard.data = game;
                gameList.appendChild(gameCard);
            });
        }
    }

    setupScrollListener() {
        window.addEventListener("scroll", () => {
            if (!this.isLoading && this.searchResults === null) {
                const scrollTop = document.documentElement.scrollTop;
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.offsetHeight;

                if (scrollTop + windowHeight >= documentHeight - 200) {
                    this.loadGame(this.currentUrl);
                }
            }
        });
    }

    loaderNextGameList() {
        const loader = this.root.querySelector(".more-loader");
        eventBus.register('nextDataReady', () => {
            !this.isLoading ? loader.classList.add("loaded") : loader.classList.remove("loaded");
        })
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/style.css" />
            <link rel="stylesheet" href="./assets/css/gamelist.css" />

            <div id="game-list" class="game-list">
                <!-- Game List Here -->
            </div>

            <div class="more-loader"></div>
        `
    }
}

window.customElements.define('app-list', GameListComponent)