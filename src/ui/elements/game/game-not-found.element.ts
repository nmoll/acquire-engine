import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { consume } from "@lit/context";
import { gameStoreContext } from "../../context/game.store.context";
import { GameStore } from "../../state/game/game.store";

@customElement("acquire-game-not-found")
export class GameLoadingElement extends LitElement {
  @consume({ context: gameStoreContext })
  gameStore!: GameStore;

  render() {
    return html`
      <img src="logo_144x144.svg" />
      <p>Unable to find game</p>
      <button @click="${() => this.gameStore.leaveGame()}">
        Home
      </button>
    `;
  }

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
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-not-found": GameLoadingElement;
  }
}
