import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createLeaveGameEvent } from "../events/leave-game-event";

@customElement("acquire-game-not-found")
export class GameLoadingElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--colors-primary);
      padding: 1rem;
    }

    button {
      border: 1px solid var(--colors-primary);
      color: var(--colors-primary);
      background: transparent;
      width: 100%;
      padding: 0.5rem 1rem;
    }
  `;

  render() {
    return html`
      <img src="logo_144x144.svg" />
      <p>Unable to find game</p>
      <button @click="${() => this.dispatchEvent(createLeaveGameEvent())}">
        Home
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-not-found": GameLoadingElement;
  }
}
