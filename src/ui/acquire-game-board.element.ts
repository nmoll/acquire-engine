import { css, html, LitElement } from "lit";
import { styleMap } from "lit-html/directives/style-map.js";
import { customElement, property } from "lit/decorators.js";
import { BoardSquareState } from "../model";
import { PlayerAction } from "../model/player-action";

export interface TileSelectEvent {
  index: number;
}

@customElement("acquire-game-board")
export class AcquireGameBoardElement extends LitElement {
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
    const styles = this.getSquareStyles(state, idx);
    return html`<div
      class="cell"
      style="${styleMap(styles)}"
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

  private getSquareStyles(state: BoardSquareState, idx: number) {
    if (this.isSelectable(idx)) {
      return {
        borderColor: "#22c55e",
        cursor: "pointer",
      };
    }

    switch (state.type) {
      case "HasTile":
        return {
          backgroundColor: "#9ca3af",
          borderColor: "#9ca3af",
          boxShadow: "none",
        };
      case "HasHotelChain":
        return {
          borderColor: `var(--colors-${state.hotelChainType})`,
          backgroundColor: `var(--colors-${state.hotelChainType})`,
        };
      default:
        return {};
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-board": AcquireGameBoardElement;
  }
}
