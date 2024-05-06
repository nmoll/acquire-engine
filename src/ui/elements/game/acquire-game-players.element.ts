import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ALL_HOTELS, ISharesState } from "../../../model";
import { ICashState } from "../../../model/cash-state";
import { PlayerUtils } from "../../../utils/player-utils";
import "./player-cash.element";
import "./player-shares.element";
import { StockBroker } from "../../../model/stock-broker";

@customElement("acquire-game-players")
export class AcquireGamePlayersElement extends LitElement {
  @property()
  players: string[] = [];

  @property()
  cashState: ICashState = {};

  @property()
  sharesState: ISharesState = {};

  @property()
  playerId!: string;

  @property()
  currentPlayer: string | undefined;

  @property()
  isGameOver = false;

  @property()
  isOpen = false;

  render() {
    const isSpectator = !this.players.includes(this.playerId);
    if (this.isOpen || this.isGameOver || isSpectator) {
      return this.players?.map((p) => this.renderPlayer(p));
    }

    return [this.renderPlayer(this.playerId), this.renderRemainingShares()];
  }

  private renderPlayer(playerId: string) {
    return html`<div class="player-name">
        ${PlayerUtils.getDisplayName(playerId)}
      </div>
      <acquire-player-cash
        .cash="${this.cashState[playerId] ?? 0}"
      ></acquire-player-cash>
      <div class="player-shares">${this.renderShares(playerId)}</div>`;
  }

  private renderShares(playerId: string) {
    return ALL_HOTELS.map((hotel) => {
      const numShares = this.sharesState?.[playerId]?.[hotel] ?? 0;
      return html`<acquire-player-shares
        .hotelChain="${hotel}"
        .numShares="${numShares}"
      />`;
    });
  }

  private renderRemainingShares() {
    const stockBroker = new StockBroker(this.sharesState);

    const shares = ALL_HOTELS.map((hotel) => {
      const numShares = stockBroker.getAvailableShares(hotel);
      return html`<acquire-player-shares
        .hotelChain="${hotel}"
        .numShares="${numShares}"
      />`;
    });

    return html`<div class="player-name"></div>
      <div></div>
      <div class="player-shares">${shares}</div>`;
  }

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 1fr 1fr min-content;
      align-items: center;
      justify-content: center;
      padding: 0.25rem;
      column-gap: 0.75rem;
      row-gap: 0.25rem;
    }

    .player-shares {
      display: flex;
      gap: 0.25rem;
    }

    acquire-player-cash {
      text-align: right;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-players": AcquireGamePlayersElement;
  }
}
