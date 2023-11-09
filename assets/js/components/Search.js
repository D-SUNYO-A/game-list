import { eventBus } from "../services/EventBus.js";
import { gameService } from "../services/GameService.js";

export class SearchComponent extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.render();
    this.connectedCallback();
  }

  connectedCallback() {
    const input = this.root.querySelector("input");
    input.addEventListener("input", this.handleSearch.bind(this));
  }

  handleSearch(event) {
    const searchTerm = event.target.value;
    if (searchTerm.length >= 3) {
      gameService.searchGameData(searchTerm).then((searchResults) => {
        eventBus.fire('searchResultsReady', searchResults);
        console.log(searchResults);
      });
    }
  }

  render() {
    this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/style.css" />
            <link rel="stylesheet" href="./assets/css/search.css" />

            <div class="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.7419 16.3141C11.9397 16.3141 13.0622 15.9525 13.9964 15.3348L17.296 18.642C17.5145 18.8529 17.7932 18.9584 18.0946 18.9584C18.7199 18.9584 19.1794 18.4687 19.1794 17.851C19.1794 17.5647 19.0815 17.2859 18.8705 17.075L15.5935 13.7829C16.2715 12.8186 16.6708 11.6509 16.6708 10.3853C16.6708 7.12327 14.0039 4.45642 10.7419 4.45642C7.48744 4.45642 4.81305 7.12327 4.81305 10.3853C4.81305 13.6473 7.4799 16.3141 10.7419 16.3141ZM10.7419 14.7321C8.35379 14.7321 6.39508 12.7734 6.39508 10.3853C6.39508 7.99716 8.35379 6.03845 10.7419 6.03845C13.13 6.03845 15.0887 7.99716 15.0887 10.3853C15.0887 12.7734 13.13 14.7321 10.7419 14.7321Z" fill="#E5E7EB"/>
                </svg>
                <input type="text" placeholder="Search..." />
            </div>
        `;
  }
}

window.customElements.define("app-search", SearchComponent);
