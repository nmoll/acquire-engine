import { css, html, LitElement } from "lit";
import { styleMap } from "lit-html/directives/style-map.js";
import { customElement, property } from "lit/decorators.js";
import { BoardSquareState } from "../../model";
import { PlayerAction } from "../../model/player-action";
import { TileUtils } from "../../utils/tile-utils";
import { ChooseTile } from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";

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
      color: #374151;
      background-color: #1f2937;
      box-shadow: rgb(0 0 0 / 59%) 0px 2px 4px 0px inset;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.75rem;
    }
  `;

  actions: PlayerAction[] = [];

  @property()
  boardState!: BoardSquareState[] | undefined;

  @property()
  availableActions!: IAvailableActionState;

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
    >
      ${this.getTileDisplay(state, idx)}
    </div>`;
  }

  private onClick(index: number): void {
    if (this.getTileOptions().available.includes(index)) {
      this.dispatchEvent(
        new CustomEvent<TileSelectEvent>("tile-select", {
          detail: {
            index,
          },
        })
      );
    }
  }

  private getTileOptions(): {
    available: number[];
    unavailable: number[];
  } {
    const chooseTileAction = this.availableActions.find(
      (action): action is ChooseTile => action.type === "ChooseTile"
    );
    if (chooseTileAction) {
      return {
        available: chooseTileAction.available,
        unavailable: chooseTileAction.unavailable,
      };
    }
    return {
      available: [],
      unavailable: [],
    };
  }

  private getTileDisplay(state: BoardSquareState, idx: number): string {
    if (state.type === "HasHotelChain") {
      return state.hotelChainType.charAt(0).toUpperCase();
    }
    return TileUtils.getTileDisplay(idx);
  }

  private getSquareStyles(state: BoardSquareState, idx: number) {
    if (this.getTileOptions().available.includes(idx)) {
      return {
        borderColor: "#22c55e",
        color: "#22c55e",
        cursor: "pointer",
      };
    }

    if (this.getTileOptions().unavailable.includes(idx)) {
      return {
        borderColor: "#dc2626",
        color: "#dc2626",
        cursor: "not-allowed",
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
          color: "#fff",
          boxShadow: "none",
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
