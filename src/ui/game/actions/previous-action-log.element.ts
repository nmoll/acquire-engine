import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PlayerActionResult } from "../../../model/player-action-result";
import { PlayerUtils } from "../../../utils/player-utils";
import { TileUtils } from "../../../utils/tile-utils";
import { createConfirmEvent } from "../../events/confirm-event";
import { HotelChainType } from "../../../model";

@customElement("acquire-previous-action-log")
export class PreviousActionLogElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
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
      padding: 0.1875rem;
    }
  `;

  @property()
  actionResults: PlayerActionResult[] = [];

  render() {
    return html`
      ${this.actionResults.map(
        (result) => html`<div>${this.renderActionResult(result)}</div>`
      )}

      <button @click="${() => this.dispatchEvent(createConfirmEvent())}">
        OK
      </button>
    `;
  }

  private renderActionResult(result: PlayerActionResult) {
    const player = PlayerUtils.getDisplayName(result.action.playerId);
    switch (result.type) {
      case "Tile Placed":
      case "Merge Initiated":
      case "Hotel Size Increased":
        return html`<div>
          ${player} placed tile
          <span class="tile">
            ${TileUtils.getTileDisplay(result.action.boardSquareId)}
          </span>
        </div> `;
      case "Hotel Merged":
        return html`
          ${player} merged
          ${this.renderHotelNames(result.dissolved.map((h) => h.type))} into
          ${this.renderHotelName(result.survivor.type)}
        `;
      case "Hotel Chain Started":
        return html`
          ${player} started ${this.renderHotelName(result.action.hotelChain)}
        `;
      case "Shares Purchased":
        return html` ${player} purchased 1
        ${this.renderHotelName(result.action.hotelChain)}`;
      case "Share Kept":
        return html`
          ${player} kept 1 ${this.renderHotelName(result.action.hotelChain)}
        `;
      case "Share Sold":
        return html`${player} sold 1
        ${this.renderHotelName(result.action.hotelChain)}`;
      case "Share Traded":
        return html`${player} traded 2
        ${this.renderHotelName(result.action.hotelChain)} for 1
        ${this.renderHotelName(result.action.hotelChainToReceive)}`;
      case "Turn Ended":
        return html``;
      case "Game Ended":
        return html`${player} ended the game`;
    }
  }

  private renderHotelName(hotelChainType: HotelChainType) {
    return html`<span style="color: var(--colors-${hotelChainType})"
      >${hotelChainType}</span
    >`;
  }

  private renderHotelNames(
    hotelChainTypes: HotelChainType[]
  ): TemplateResult[] {
    const result: TemplateResult[] = [];
    hotelChainTypes.forEach((type, idx) => {
      if (idx > 0 && idx < hotelChainTypes.length - 1) {
        result.push(html` and `);
      }
      result.push(html`${this.renderHotelName(type)}`);
    });

    return result;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-previous-action-log": PreviousActionLogElement;
  }
}
