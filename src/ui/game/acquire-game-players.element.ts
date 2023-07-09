import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ALL_HOTELS, ISharesState } from "../../model";
import { ICashState } from "../../model/cash-state";
import { PlayerUtils } from "../../utils/player-utils";
import "./player-cash.element";
import "./player-shares.element";

@customElement("acquire-game-players")
export class AcquireGamePlayersElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-around;
    }

    .player {
      padding: 0.25rem;
      display: grid;
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: center;
    }

    .player-name {
      display: flex;
      align-items: center;
    }

    .player-holdings {
      grid-column: 1 / -1;
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
      return html`<acquire-player-shares
        .hotelChain="${hotel}"
        .numShares="${numShares}"
      />`;
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
          <div class="player-name">${PlayerUtils.getDisplayName(playerId)}</div>
          <acquire-player-cash
            .cash="${this.cashState[playerId] ?? 0}"
          ></acquire-player-cash>
          <div class="player-holdings">${this.renderShares(playerId)}</div>
        </div>`
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-players": AcquireGamePlayersElement;
  }
}
