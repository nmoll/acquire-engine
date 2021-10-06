import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BoardSquareState } from "../model";
import { PlayerAction } from "../model/player-action";

export interface TileSelectEvent {
  index: number;
}

@customElement("acquire-board")
export class AcquireBoardElement extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }

    .board {
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

    .cell.has-hotel {
      background-color: #0284c7;
      border-color: #0284c7;
      box-shadow: none;
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
        return "has-hotel";
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
