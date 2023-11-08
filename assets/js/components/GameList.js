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

        this.render();
        this.loaderNextGameList();
        this.renderGameList(this.currentUrl);

        this.setupScrollListener(); // Mettez en place l'écouteur de défilement
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

        this.renderGameList(this.currentUrl); // Mettez à jour l'affichage de la liste

        this.isLoading = false;
    }

    async renderGameList(url) {
        const games = await gameService.getGameData(url);
        this.games = [...this.games, ...games];
        const gameList = this.root.getElementById("game-list");

        gameList.innerHTML = '';

        this.games.forEach(game => {
            const gameCard = document.createElement('app-card');
            gameCard.data = game;
            gameList.appendChild(gameCard);
        });
    }

    setupScrollListener() {
        window.addEventListener("scroll", () => {
            const scrollTop = document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.offsetHeight;

            if (scrollTop + windowHeight >= documentHeight - 200) {
                this.loadGame(this.currentUrl);
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

        const listTitle = "Filtered by popularity"

        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/style.css" />
            <link rel="stylesheet" href="./assets/css/gamelist.css" />

            <h2 class="list-title">
                ${listTitle}
            </h2>

            <div id="game-list" class="game-list">
                <!-- Game List Here -->
            </div>

            <div class="more-loader"></div>
        `
    }
}

window.customElements.define('app-list', GameListComponent)