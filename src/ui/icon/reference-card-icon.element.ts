import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("reference-card-icon")
export class ReferenceCardIconElement extends LitElement {
    static styles = css`
    :host {
      width: 24px;
      height: 24px;
    }
  `;

    render() {
        return html`
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120ZM200-640h560v-120H200v120Zm100 80H200v360h100v-360Zm360 0v360h100v-360H660Zm-80 0H380v360h200v-360Z"/></svg>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "tip-icon": ReferenceCardIconElement;
    }
}
