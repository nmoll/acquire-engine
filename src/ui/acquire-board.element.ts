import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BoardSquareState, HotelChainType } from "../model";
import { PlayerAction } from "../model/player-action";

export interface TileSelectEvent {
  index: number;
}

@customElement("acquire-board")
export class AcquireBoardElement extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }

    .cell {
      border: 1px solid #374151;
      background-color: #1f2937;
      box-shadow: rgb(0 0 0 / 59%) 0px 2px 4px 0px inset;
    }

    .cell.has-tile {
      background-color: #9ca3af;
      border-color: #9ca3af;
      box-shadow: none;
    }

    .bg-sky-600 {
      background-color: #0284c7;
    }

    .border-sky-600 {
      border-color: #0284c7;
    }

    .bg-green-600 {
      background-color: #16a34a;
    }

    .border-green-600 {
      border-color: #16a34a;
    }

    .bg-amber-600 {
      background-color: #d97706;
    }

    .border-amber-600 {
      border-color: #d97706;
    }

    .bg-red-600 {
      background-color: #dc2626;
    }

    .border-red-600 {
      border-color: #dc2626;
    }

    .bg-purple-600 {
      background-color: #9333ea;
    }

    .border-purple-600 {
      border-color: #9333ea;
    }

    .bg-pink-600 {
      background-color: #db2777;
    }

    .border-pink-600 {
      border-color: #db2777;
    }

    .bg-orange-600 {
      background-color: #ea580c;
    }

    .border-orange-600 {
      border-color: #ea580c;
    }

    .cell.selectable {
      border-color: #22c55e;
      cursor: pointer;
    }
  `;

  actions: PlayerAction[] = [];

  @property()
  boardState!: BoardSquareState[] | undefined;

  @property()
  availableForSelection!: number[] | undefined;

  render() {
    return this.boardState?.map((squareState, idx) =>
      this.renderSquare(squareState, idx)
    );
  }

  renderSquare(state: BoardSquareState, idx: number) {
    return html`<div
      class="cell ${this.getSquareClass(state, idx)}"
      @click=${() => this.onClick(idx)}
    ></div>`;
  }

  private onClick(index: number): void {
    if (this.isSelectable(index)) {
      this.dispatchEvent(
        new CustomEvent<TileSelectEvent>("tile-select", {
          detail: {
            index,
          },
        })
      );
    }
  }

  private isSelectable(idx: number): boolean {
    return this.availableForSelection?.includes(idx) || false;
  }

  private getSquareClass(state: BoardSquareState, idx: number): string {
    if (this.isSelectable(idx)) {
      return "selectable";
    }

    switch (state.type) {
      case "HasTile":
        return "has-tile";
      case "HasHotelChain":
        return this.getHotelClass(state.hotelChainType);
      default:
        return "";
    }
  }

  getHotelClass(type: HotelChainType): string {
    switch (type) {
      case "WORLDWIDE":
        return "bg-amber-600 border-amber-600";
      case "LUXOR":
        return "bg-orange-600 border-orange-600";
      case "FESTIVAL":
        return "bg-green-600 border-green-600";
      case "IMPERIAL":
        return "bg-pink-600 border-pink-600";
      case "AMERICAN":
        return "bg-sky-600 border-sky-600";
      case "CONTINENTAL":
        return "bg-red-600 border-red-600";
      case "TOWER":
        return "bg-purple-600 border-purple-600";
      default:
        return "";
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-board": AcquireBoardElement;
  }
}
