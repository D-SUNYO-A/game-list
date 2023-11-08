import { SearchComponent } from "./Search.js";
import { FilterComponent } from "./Filter.js";

export class ActionsComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'closed' });
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <link rel="stylesheet" href="./assets/css/style.css" />
            <link rel="stylesheet" href="./assets/css/actions.css" />

            <div class="actions">
                <app-search></app-search>
                <app-filter></app-filter>
            </div>
        `
    }
}

window.customElements.define('app-actions', ActionsComponent)