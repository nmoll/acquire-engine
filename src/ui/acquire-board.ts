import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GameStateEngine } from "../engine/game-state-engine/game-state-engine";
import { BoardSquareState, IGameState } from "../model";
import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerAction } from "../model/player-action";
import { Client } from "./client";
import { parseQueryParams } from "./query-params";

const INSTANCE: IAcquireGameInstance = {
  randomSeed: 1,
  playerIds: [1, 2, 3, 4],
};

const PLAYER_ID = 1;

const params = parseQueryParams(window.location.href);
const gameId = params["game-id"];
if (gameId) {
  Client.connect(gameId);
} else {
  Client.startConnection("acquire-game-1");
}

/**
 * Acquire Game Board
 */
@customElement("acquire-board")
export class AcquireBoard extends LitElement {
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

  @property()
  actions: PlayerAction[] = [];

  private state: IGameState;

  constructor() {
    super();
    this.state = GameStateEngine.computeGameState(INSTANCE, this.actions);
  }

  render() {
    console.log("render", this.state);
    return this.state.boardState.map((squareState, idx) =>
      this.renderSquare(squareState, idx)
    );
  }

  renderSquare(state: BoardSquareState, idx: number) {
    return html`<div
      class="cell ${this.getSquareClass(state, idx)}"
      @click=${() => this.onClick(idx)}
    ></div>`;
  }

  private onClick(idx: number): void {
    if (this.isSelectable(idx)) {
      this.actions = [
        ...this.actions,
        {
          type: "PlaceTile",
          playerId: PLAYER_ID,
          boardSquareId: idx,
        },
        {
          type: "EndTurn",
          playerId: PLAYER_ID,
        },
      ];
      this.state = GameStateEngine.computeGameState(INSTANCE, this.actions);
    }
  }

  private isSelectable(idx: number): boolean {
    if (this.state.currentPlayerIdState !== PLAYER_ID) {
      return false;
    }

    return this.state.tileState[this.state.currentPlayerIdState].includes(idx);
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
    "acquire-board": AcquireBoard;
  }
}
