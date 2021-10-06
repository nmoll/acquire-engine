import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("acquire-players")
export class AcquirePlayersElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-around;
    }

    .player {
      padding: 0.5rem;
    }

    .current {
      color: green;
    }
  `;

  @property()
  players: number[] | undefined = [];

  @property()
  currentPlayer: number | undefined;

  render() {
    return this.players?.map(
      (playerId) =>
        html`<div
          class="player ${playerId === this.currentPlayer ? "current" : ""}"
        >
          Player ${playerId}
        </div>`
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-players": AcquirePlayersElement;
  }
}
