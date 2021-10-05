import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GameStateEngine } from "../engine/game-state-engine/game-state-engine";
import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerAction } from "../model/player-action";

const gameInstance: IAcquireGameInstance = {
  randomSeed: 1,
  playerIds: [1, 2, 3, 4],
};

const actions: PlayerAction[] = [];

const gameState = GameStateEngine.computeGameState(gameInstance, actions);

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
      border: 1px solid gray;
    }
  `;

  @property()
  name = "";

  @property({ type: Number })
  count = 0;

  render() {
    return gameState.boardState.map((_) => html`<div class="cell"></div>`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-board": AcquireBoard;
  }
}
