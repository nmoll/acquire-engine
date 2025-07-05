import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("back-icon")
export class BackIconElement extends LitElement {
    static styles = css`
    :host {
      width: 24px;
      height: 24px;
    }
  `;

    render() {
        return html`
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="m480-320 56-56-64-64h168v-80H472l64-64-56-56-160 160 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "back-icon": BackIconElement;
    }
}
