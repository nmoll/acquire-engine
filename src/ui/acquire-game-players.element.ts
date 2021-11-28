import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ALL_HOTELS, ISharesState } from "../model";
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

    .player-name {
      display: flex;
      align-items: center;
    }

    .player-holdings {
      display: flex;
      gap: 0.25rem;
      margin-top: 0.25rem;
    }

    .player-cash {
      margin-right: 0.5rem;
      color: #34d399;
    }

    .player-shares-qty {
      color: white;
      width: 1.25rem;
      height: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .current-turn-indicator {
      border: solid;
      border-width: 0 2px 2px 0;
      display: none;
      padding: 3px;
    }

    .current-turn .current-turn-indicator {
      display: inline-block;
    }

    .right {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      margin-right: 0.5rem;
    }

    .left {
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
      margin-left: 0.5rem;
    }
  `;

  @property()
  players: string[] | undefined = [];

  @property()
  cashState: ICashState = {};

  @property()
  sharesState: ISharesState = {};

  @property()
  currentPlayer: string | undefined;

  renderShares(playerId: string) {
    return html`${ALL_HOTELS.map((hotel) => {
      const numShares = this.sharesState?.[playerId]?.[hotel] ?? 0;
      if (numShares === 0) {
        return "";
      }
      return html`<span
        class="player-shares-qty"
        style="background: var(--colors-${hotel})"
        >${numShares}</span
      >`;
    })}`;
  }

  render() {
    return this.players?.map(
      (playerId) =>
        html`<div
          class="player ${playerId === this.currentPlayer
            ? "current-turn"
            : ""}"
        >
          <div class="player-name">
            <span class="current-turn-indicator right"></span>
            ${PlayerUtils.getDisplayName(playerId)}
            <span class="current-turn-indicator left"></span>
          </div>
          <div class="player-holdings">
            <span class="player-cash">$${this.cashState[playerId] ?? 0}</span>
            ${this.renderShares(playerId)}
          </div>
        </div>`
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-players": AcquireGamePlayersElement;
  }
}
