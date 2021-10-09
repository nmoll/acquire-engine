import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AvailableActionsStateEngine } from "../engine/available-actions-state-engine/available-actions-state-engine";
import { GameStateEngine } from "../engine/game-state-engine/game-state-engine";
import { IGameState } from "../model";
import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerAction } from "../model/player-action";
import "./acquire-actions.element";
import { ActionRequestEvent } from "./acquire-actions.element";
import "./acquire-board.element";
import { TileSelectEvent } from "./acquire-board.element";
import "./acquire-players.element";

const INSTANCE: IAcquireGameInstance = {
  randomSeed: Math.random() * 1000,
  playerIds: [1, 2, 3, 4],
};

@customElement("acquire-app")
export class AcquireAppElement extends LitElement {
  static styles = css`
    :host {
      height: 100%;
    }

    .flex {
      display: flex;
    }

    .flex-1 {
      flex: 1 1 0%;
    }

    .flex-col {
      flex-direction: column;
    }

    .h-full {
      height: 100%;
    }
  `;

  @property()
  actions: PlayerAction[] = [];

  private state: IGameState;

  constructor() {
    super();
    this.state = GameStateEngine.computeGameState(INSTANCE, this.actions);
  }

  onTileSelect(event: CustomEvent<TileSelectEvent>) {
    this.onPlayerAction({
      type: "PlaceTile",
      playerId: this.getCurrentPlayerId(),
      boardSquareId: event.detail.index,
    });
  }

  onPlayerAction(action: PlayerAction) {
    if (AvailableActionsStateEngine.validateAction(action, this.state)) {
      this.actions = [...this.actions, action];
      this.state = GameStateEngine.computeGameState(INSTANCE, this.actions);
    }
  }

  render() {
    return html` <div class="flex h-full">
      <div class="flex-1 flex flex-col">
        <acquire-players
          .players="${INSTANCE.playerIds}"
          .cashState="${this.state.cashState}"
          .currentPlayer="${this.getCurrentPlayerId()}"
        ></acquire-players>
        <acquire-board
          class="flex-1"
          .boardState="${this.state.boardState}"
          .availableForSelection="${this.state.tileState[
            this.getCurrentPlayerId()
          ]}"
          @tile-select="${(e: CustomEvent<TileSelectEvent>) =>
            this.onTileSelect(e)}"
        >
        </acquire-board>
      </div>
      <acquire-actions
        style="width: 100px;"
        .playerId="${this.getCurrentPlayerId()}"
        .availableActionState="${this.state.availableActionsState}"
        @action-request="${(e: CustomEvent<ActionRequestEvent>) =>
          this.onPlayerAction(e.detail.action)}"
      ></acquire-actions>
    </div>`;
  }

  private getCurrentPlayerId(): number {
    return this.state.currentPlayerIdState ?? 0;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-app": AcquireAppElement;
  }
}
