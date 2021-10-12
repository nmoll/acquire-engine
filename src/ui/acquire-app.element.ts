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
import "./acquire-button.element";
import "./acquire-players.element";
import { FirebaseService } from "./firebase.service";

const INSTANCE: IAcquireGameInstance = {
  randomSeed: 1,
  playerIds: ["1", "2", "3", "4"],
};

@customElement("acquire-app")
export class AcquireAppElement extends LitElement {
  static styles = css`
    :host {
      height: 100%;
    }

    .app {
      background-color: var(--colors-gray-900);
      color: var(--colors-gray-100);
      height: 100%;
      display: grid;
    }

    .app.landscape {
      grid-template-columns: 4fr 1fr;
      grid-template-rows: min-content auto;
    }

    .app.portrait {
      grid-template-columns: auto;
      grid-template-rows: min-content 1fr 1fr;
    }

    .app.landscape acquire-board {
      grid-row: 2;
    }

    .app.landscape acquire-actions {
      grid-row: 2;
      grid-column: 2;
    }
  `;

  @property()
  actions: PlayerAction[] = [];

  @property()
  orientation: "landscape" | "portrait";

  private state: IGameState;
  private service: FirebaseService;

  constructor() {
    super();
    this.state = GameStateEngine.computeGameState(INSTANCE, this.actions);

    this.service = new FirebaseService();

    this.service.onActionsChanged((actions) => {
      this.actions = actions;
      this.state = GameStateEngine.computeGameState(INSTANCE, this.actions);
    });

    this.orientation =
      window.innerHeight > window.innerWidth ? "portrait" : "landscape";
    window.addEventListener("resize", () => {
      this.orientation =
        window.innerHeight > window.innerWidth ? "portrait" : "landscape";
    });
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
      this.service.updateActions([...this.actions, action]);
    }
  }

  render() {
    return html`<div class="app ${this.orientation}">
      <acquire-players
        .players="${INSTANCE.playerIds}"
        .cashState="${this.state.cashState}"
        .currentPlayer="${this.getCurrentPlayerId()}"
      ></acquire-players>

      <acquire-board
        .boardState="${this.state.boardState}"
        .availableForSelection="${this.state.tileState[
          this.getCurrentPlayerId()
        ]}"
        @tile-select="${(e: CustomEvent<TileSelectEvent>) =>
          this.onTileSelect(e)}"
      >
      </acquire-board>

      <acquire-actions
        .playerId="${this.getCurrentPlayerId()}"
        .availableActionState="${this.state.availableActionsState}"
        @action-request="${(e: CustomEvent<ActionRequestEvent>) =>
          this.onPlayerAction(e.detail.action)}"
      ></acquire-actions>
    </div>`;
  }

  private getCurrentPlayerId(): string {
    return this.state.currentPlayerIdState ?? "";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-app": AcquireAppElement;
  }
}
