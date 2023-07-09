import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("acquire-game-loading")
export class GameLoadingElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--colors-primary);
    }
  `;

  render() {
    return html`
      <img src="logo_144x144.svg" />
      <p>Loading game...</p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-loading": GameLoadingElement;
  }
}
