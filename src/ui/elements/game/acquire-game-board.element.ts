import { css, html, LitElement } from "lit";
import { styleMap } from "lit-html/directives/style-map.js";
import { customElement, property } from "lit/decorators.js";
import { BoardSquareState } from "../../../model";
import { TileUtils } from "../../../utils/tile-utils";
import { ChooseTile } from "../../../model/available-action";
import { IAvailableActionState } from "../../../model/available-action-state";
import { createTileSelectEvent } from "../../events/tile-select-event";
import { AcquireGameService } from "./acquire-game.service";
import { createHotelSelectEvent } from "../../events/hotel-select-event";

const getCellId = (idx: number) => `cell-${idx}`;

@customElement("acquire-game-board")
export class AcquireGameBoardElement extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }

    .cell {
      border: 1px solid var(--colors-gray-700);
      color: var(--colors-gray-700);
      background-color: #1f2937;
      box-shadow: rgb(0 0 0 / 59%) 0px 2px 4px 0px inset;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.75rem;
    }
  `;

  @property()
  boardState!: BoardSquareState[] | undefined;

  @property()
  availableActions!: IAvailableActionState;

  @property()
  playerTiles: number[] = [];

  @property()
  isPlayerTurn!: boolean;

  @property()
  availableForSelection!: number[] | undefined;

  @property()
  selectedTile!: number | null;

  constructor() {
    super();

    AcquireGameService.getInstance().setGameBoard(this);
  }

  render() {
    return this.boardState?.map((squareState, idx) =>
      this.renderSquare(squareState, idx)
    );
  }
  renderSquare(state: BoardSquareState, idx: number) {
    const styles = this.getSquareStyles(state, idx);
    const layer1Styles = {
      ...styles,
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
      transform: "translate(-1.5px, -1px)",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
    const layer2Styles = {
      ...layer1Styles,
      transform: "translate(-1px, -0.5px)",
    }
    return html`<div
    class="cell"
    id="${getCellId(idx)}"
    style="${styleMap(styles)}"
    @click=${() => this.onClick(idx)}
    >
      <div style="${state.type !== 'Default' ? styleMap(layer2Styles) : ''}">
        <div style="${state.type !== 'Default' ? styleMap(layer1Styles) : ''}">
          ${this.getTileDisplay(state, idx)}
        </div>
      </div>
    </div>`;
  }

  getSquareEl(id: number) {
    return this.shadowRoot?.getElementById(getCellId(id));
  }

  private onClick(tile: number): void {
    if (this.getTileOptions().available.includes(tile)) {
      this.dispatchEvent(createTileSelectEvent(tile));
      return;
    }
    const squareState = this.boardState?.[tile]
    if (squareState?.type === 'HasHotelChain') {
      this.dispatchEvent(createHotelSelectEvent(squareState.hotelChainType))
      return;
    }
  }

  private getTileOptions(): {
    available: number[];
    unavailable: number[];
  } {
    if (!this.isPlayerTurn) {
      return {
        available: [],
        unavailable: [],
      };
    }

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
    if (idx === this.selectedTile) {
      return {
        borderColor: "var(--colors-primary)",
        background: "var(--colors-tile)",
        boxShadow: "none",
      };
    }

    if (this.getTileOptions().unavailable.includes(idx)) {
      return {
        borderColor: "var(--colors-red-600)",
        color: "var(--colors-red-600)",
        cursor: "not-allowed",
      };
    }

    if (this.playerTiles.includes(idx)) {
      return {
        borderColor: "var(--colors-primary)",
        color: "var(--colors-primary)",
        cursor: "pointer",
      };
    }

    switch (state.type) {
      case "HasTile":
        return {
          backgroundColor: "var(--colors-tile)",
          borderColor: "var(--colors-tile)",
          borderRadius: "0.2rem",
          boxShadow: "none"
        };
      case "HasHotelChain":
        return {
          borderColor: `var(--colors-${state.hotelChainType})`,
          backgroundColor: `var(--colors-${state.hotelChainType})`,
          color: "#fff",
          borderRadius: "0.2rem",
          boxShadow: "none"
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
