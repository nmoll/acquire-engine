import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ICashState } from "../model/cash-state";
import { PlayerUtils } from "../utils/player-utils";

@customElement("acquire-game-players")
export class AcquireGamePlayersElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-around;
    }

    .player {
      padding: 0.5rem;
    }

    .current {
      color: #34d399;
    }
  `;

  @property()
  players: string[] | undefined = [];

  @property()
  cashState: ICashState = {};

  @property()
  currentPlayer: string | undefined;

  render() {
    return this.players?.map(
      (playerId) =>
        html`<div
          class="player ${playerId === this.currentPlayer ? "current" : ""}"
        >
          <div>Player ${PlayerUtils.getDisplayName(playerId)}</div>
          <div>$${this.cashState[playerId] ?? 0}</div>
        </div>`
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-players": AcquireGamePlayersElement;
  }
}
