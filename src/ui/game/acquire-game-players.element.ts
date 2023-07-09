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
      display: grid;
      grid-template-columns: 1fr 1fr 2fr;
      align-items: center;
      justify-content: center;
      padding: 0.25rem;
    }

    .player-holdings {
      display: flex;
      gap: 0.25rem;
      margin-top: 0.25rem;
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

  render() {
    return this.players?.map((playerId) => this.renderPlayer(playerId));
  }

  private renderPlayer(playerId: string) {
    return html`<div class="player-name">
        ${PlayerUtils.getDisplayName(playerId)}
      </div>
      <acquire-player-cash
        .cash="${this.cashState[playerId] ?? 0}"
      ></acquire-player-cash>
      <div class="player-holdings">${this.renderShares(playerId)}</div>`;
  }

  private renderShares(playerId: string) {
    return html`${ALL_HOTELS.map((hotel) => {
      const numShares = this.sharesState?.[playerId]?.[hotel] ?? 0;
      return html`<acquire-player-shares
        .hotelChain="${hotel}"
        .numShares="${numShares}"
      />`;
    })}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-players": AcquireGamePlayersElement;
  }
}
