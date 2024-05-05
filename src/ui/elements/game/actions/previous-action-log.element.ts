import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  PlayerActionResult,
  isGameEndedResult,
  isHotelChainStartedResult,
  isHotelMergedResult,
  isHotelSizeIncreasedResult,
  isMergeInitiatedResult,
  isShareKeptResult,
  isShareSoldResult,
  isShareTradedResult,
  isSharesPurchasedResult,
  isTilePlacedResult,
} from "../../../../model/player-action-result";
import { createConfirmEvent } from "../../../events/confirm-event";
import "../player-shares.element";
import { HotelChainType } from "../../../../model";
import { ArrayUtils } from "../../../../utils/array-utils";
import { PlayerUtils } from "../../../../utils/player-utils";
import "./played-tile.element";
import "../hotel/hotel-name.element";

type PlayerActionRenderers = Record<
  PlayerActionResult["type"],
  (results: PlayerActionResult[]) => TemplateResult | null
>;

type SharesByHotel = Partial<Record<HotelChainType, number>>;

@customElement("acquire-previous-action-log")
export class PreviousActionLogElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .player-logs {
      display: grid;
      grid-template-columns: min-content 1fr;
      gap: 0.5rem;
      align-items: center;
    }

    button {
      width: 100%;
      border: 1px solid var(--colors-primary);
      color: var(--colors-primary);
      background: transparent;
      padding: 0.5rem;
    }

    .tile {
      background: var(--colors-tile);
      color: var(--colors-gray-700);
      font-size: 0.875rem;
      aspect-ratio: 1/1;
      width: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .player-name {
      justify-self: end;
    }

    .cash {
      color: var(--colors-emerald-400);
    }

    .result-log {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
    }
  `;

  @property()
  actionResults: PlayerActionResult[] = [];

  render() {
    const playerIds = ArrayUtils.unique(
      this.actionResults.map((r) => r.action.playerId)
    );
    const playerLogs: TemplateResult[] = [];

    playerIds.forEach((playerId) => {
      const actionResults = this.actionResults.filter(
        (r) => r.action.playerId === playerId
      );

      Object.values(this.actionRenderers)
        .map((renderer) => renderer(actionResults))
        .filter((result) => !!result)
        .forEach((logTemplate, idx) => {
          playerLogs.push(html`
            <div class="player-name">
              ${idx === 0 ? PlayerUtils.getDisplayName(playerId) : ""}
            </div>
            <div class="result-log">${logTemplate}</div>
          `);
        });
    });

    return html`
      <div class="player-logs">${playerLogs}</div>

      <button @click="${() => this.dispatchEvent(createConfirmEvent())}">
        OK
      </button>
    `;
  }

  private actionRenderers: PlayerActionRenderers = {
    "Tile Placed": (results) => {
      const result = results.find(isTilePlacedResult);
      if (!result) {
        return null;
      }

      return html`placed tile
        <acquire-played-tile
          .tile="${result.action.boardSquareId}"
        ></acquire-played-tile>`;
    },
    "Hotel Size Increased": (results) => {
      const result = results.find(isHotelSizeIncreasedResult);
      if (!result) {
        return null;
      }

      return html`placed tile
        <acquire-played-tile
          .tile="${result.action.boardSquareId}"
        ></acquire-played-tile>`;
    },
    "Merge Initiated": (results) => {
      const result = results.find(isMergeInitiatedResult);
      if (!result) {
        return null;
      }

      return html`placed tile
        <acquire-played-tile
          .tile="${result.action.boardSquareId}"
        ></acquire-played-tile>`;
    },
    "Hotel Chain Started": (results) => {
      const result = results.find(isHotelChainStartedResult);
      if (!result) {
        return null;
      }

      return html`started ${this.renderHotelName(result.action.hotelChain)}`;
    },
    "Hotel Merged": (results) => {
      const result = results.find(isHotelMergedResult);
      if (!result) {
        return null;
      }

      return html`merged
      ${this.renderHotelNames(result.dissolved.map((h) => h.type))} into
      ${this.renderHotelName(result.survivor.type)}
      ${this.renderCashAwarded(result.cashAwarded)} `;
    },
    "Share Kept": (results) => {
      const kept = results.filter(isShareKeptResult);
      if (!kept.length) {
        return null;
      }

      const sharesByType = kept.reduce<SharesByHotel>(
        (acc, i) => ({
          ...acc,
          [i.action.hotelChain]: (acc[i.action.hotelChain] ?? 0) + 1,
        }),
        {}
      );

      return html`kept
      ${Object.entries(sharesByType).map(([hotel, shares]) =>
        this.renderShares(hotel as HotelChainType, shares)
      )}`;
    },
    "Share Sold": (results) => {
      const sold = results.filter(isShareSoldResult);
      if (!sold.length) {
        return null;
      }

      const sharesByType = sold.reduce<SharesByHotel>(
        (acc, i) => ({
          ...acc,
          [i.action.hotelChain]: (acc[i.action.hotelChain] ?? 0) + 1,
        }),
        {}
      );

      return html`sold
      ${Object.entries(sharesByType).map(([hotel, shares]) =>
        this.renderShares(hotel as HotelChainType, shares)
      )}`;
    },
    "Share Traded": (results) => {
      const traded = results.filter(isShareTradedResult);
      if (!traded.length) {
        return null;
      }
      const sharesTradedByType = traded.reduce<SharesByHotel>(
        (acc, i) => ({
          ...acc,
          [i.action.hotelChain]: (acc[i.action.hotelChain] ?? 0) + 2,
        }),
        {}
      );

      return html`traded
      ${Object.entries(sharesTradedByType).map(([hotel, shares]) =>
        this.renderShares(hotel as HotelChainType, shares)
      )}
      for
      ${this.renderShares(traded[0].action.hotelChainToReceive, traded.length)}`;
    },
    "Shares Purchased": (results) => {
      const purchased = results.filter(isSharesPurchasedResult);
      if (!purchased.length) {
        return null;
      }
      const sharesByType = purchased.reduce<SharesByHotel>(
        (acc, i) => ({
          ...acc,
          [i.action.hotelChain]: (acc[i.action.hotelChain] ?? 0) + 1,
        }),
        {}
      );

      return html`purchased
      ${Object.entries(sharesByType).map(([hotel, shares]) =>
        this.renderShares(hotel as HotelChainType, shares)
      )}`;
    },
    "Turn Ended": () => null,
    "Game Ended": (results) => {
      const result = results.find(isGameEndedResult);
      if (!result) {
        return null;
      }

      return html`ended the game`;
    },
  };

  private renderShares(hotelChainType: HotelChainType, shares: number) {
    return html`<acquire-player-shares
      .hotelChain="${hotelChainType}"
      .numShares="${shares}"
    />`;
  }

  private renderHotelName(hotelChainType: HotelChainType) {
    return html`<acquire-hotel-name .hotelChainType="${hotelChainType}"></acquire-hotel-chain-name>`;
  }

  private renderCashAwarded(cashAwarded: Record<string, number>) {
    const awards = Object.entries(cashAwarded).map(
      ([playerId, cash]) =>
        html`${PlayerUtils.getDisplayName(playerId)} received
          <span class="cash">$${cash}</span>`
    );

    return html`${awards}`;
  }

  private renderHotelNames(
    hotelChainTypes: HotelChainType[]
  ): TemplateResult[] {
    const result: TemplateResult[] = [];
    hotelChainTypes.forEach((type, idx) => {
      result.push(html`${this.renderHotelName(type)}`);
      if (idx >= 0 && idx < hotelChainTypes.length - 1) {
        result.push(html` and `);
      }
    });

    return result;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-previous-action-log": PreviousActionLogElement;
  }
}
