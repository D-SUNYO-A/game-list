import { formatDate } from "../utils/formatDate.js";

export class GameCardComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
    }

    getGameGenres = game => {
        const genres = this.root.querySelector(".genres");
        game.genres.forEach(genre => {
            const genreBadge = document.createElement('div');
            genreBadge.classList.add("genre");
            genreBadge.innerText = genre.name;
            genres.appendChild(genreBadge);
        });
    }

    getGamePlatforms = game => {
        const platforms = this.root.querySelector(".platforms");

        if(game.parent_platforms) {
            game.parent_platforms.forEach(platform => {
                const platformIcon = document.createElement('img');
                if(platform.platform) {
                    platformIcon.alt = platform.platform.slug;
                    platformIcon.src = `./assets/img/${platform.platform.slug}.png`;
                    platforms.appendChild(platformIcon);
                } else {
                    this.root.querySelector(".head-info").style.display = 'none';
                    this.root.querySelector(".genres").style.display = 'none';
                    this.root.querySelector(".chart").style.display = 'none';
                    this.root.querySelector(".date").style.borderBottom = 'none';
                }
            });
        }

    }

    set data(game) {

        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/style.css" />
            <link rel="stylesheet" href="./assets/css/gamecard.css" />
            
            <div class="card">
                <div class="card-header">
                    <img src="${game.background_image}" alt="bg-game">
                </div>
                <div class="card-body">
                    <div class="head-info">
                        <div class="platforms"></div>
                        <div class="rate">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M7.0001 10.0742L9.42094 11.5384C9.86427 11.8067 10.4068 11.41 10.2901 10.9084L9.64844 8.15503L11.7893 6.30003C12.1801 5.96169 11.9701 5.32003 11.4568 5.27919L8.63927 5.04003L7.53677 2.43836C7.33844 1.96586 6.66177 1.96586 6.46344 2.43836L5.36094 5.03419L2.54344 5.27336C2.0301 5.31419 1.8201 5.95586 2.21094 6.29419L4.35177 8.14919L3.7101 10.9025C3.59344 11.4042 4.13594 11.8009 4.57927 11.5325L7.0001 10.0742Z" fill="#EAB308"/>
                            </svg>
                            <span>${game.rating}</span>
                        </div>
                    </div>
                    <h5 class="game-name">${game.name}</h5>
                </div>
                <div class="card-footer">
                    <div class="genres"></div>
                    <div class="details">
                        <div class="info date">
                            <p class="info-label">Release date</p>
                            <p class="info-value">${formatDate(game.released)}</p>
                        </div>
                        <div class="info chart">
                            <p class="info-label">Chart</p>
                            <p class="info-value">#${game.rating_top} Top</p>
                        </div>
                    </div>
                </div>
            </div>
        `

        this.getGameGenres(game);
        this.getGamePlatforms(game);
    }
}

window.customElements.define('app-card', GameCardComponent);