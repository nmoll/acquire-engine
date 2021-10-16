import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { AvailableActionsStateEngine } from "../engine/available-actions-state-engine/available-actions-state-engine";
import { GameStateEngine } from "../engine/game-state-engine/game-state-engine";
import { IGameState } from "../model";
import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerAction } from "../model/player-action";
import "./acquire-button.element";
import "./acquire-game-actions.element";
import { ActionRequestEvent } from "./acquire-game-actions.element";
import "./acquire-game-board.element";
import { TileSelectEvent } from "./acquire-game-board.element";
import "./acquire-game-players.element";
import { FirebaseService } from "./firebase.service";

@customElement("acquire-game")
export class AcquireGameElement extends LitElement {
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

    .app.landscape acquire-game-board {
      grid-row: 2;
    }

    .app.landscape acquire-game-actions {
      grid-row: 2;
      grid-column: 2;
    }
  `;

  @property()
  game!: IAcquireGameInstance;

  @property()
  playerId!: string;

  @state()
  actions: PlayerAction[] = [];

  @state()
  orientation: "landscape" | "portrait";

  private state!: IGameState;
  private service: FirebaseService;

  constructor() {
    super();

    this.service = new FirebaseService();

    this.orientation = this.calculateOrientation();
    window.addEventListener("resize", () => {
      this.orientation = this.calculateOrientation();
    });
  }

  update(changedProperties: Map<keyof this, unknown>) {
    if (changedProperties.has("game") && this.game) {
      this.state = GameStateEngine.computeGameState(this.game, this.actions);

      this.service.onActionsChanged(this.game.id, (actions) => {
        this.actions = actions;
        if (this.game) {
          this.state = GameStateEngine.computeGameState(
            this.game,
            this.actions
          );
        }
      });
    }

    super.update(changedProperties);
  }

  onTileSelect(event: CustomEvent<TileSelectEvent>) {
    this.onPlayerAction({
      type: "PlaceTile",
      playerId: this.playerId,
      boardSquareId: event.detail.index,
    });
  }

  onPlayerAction(action: PlayerAction) {
    if (
      AvailableActionsStateEngine.validateAction(action, this.state) &&
      this.game
    ) {
      this.service.updateActions(this.game.id, [...this.actions, action]);
    }
  }

  render() {
    if (!this.game || !this.state) {
      return;
    }

    return html`<div class="app ${this.orientation}">
      <acquire-game-players
        .players="${this.game.playerIds}"
        .cashState="${this.state.cashState}"
        .currentPlayer="${this.getCurrentPlayerId()}"
      ></acquire-game-players>

      <acquire-game-board
        .boardState="${this.state.boardState}"
        .availableForSelection="${this.state.tileState[this.playerId]}"
        @tile-select="${(e: CustomEvent<TileSelectEvent>) =>
          this.onTileSelect(e)}"
      >
      </acquire-game-board>

      <acquire-game-actions
        .playerId="${this.playerId}"
        .currentPlayerId="${this.getCurrentPlayerId()}"
        .availableActionState="${this.state.availableActionsState}"
        @action-request="${(e: CustomEvent<ActionRequestEvent>) =>
          this.onPlayerAction(e.detail.action)}"
      ></acquire-game-actions>
    </div>`;
  }

  private getCurrentPlayerId(): string {
    return this.state.currentPlayerIdState ?? "";
  }

  private calculateOrientation(): "landscape" | "portrait" {
    return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game": AcquireGameElement;
  }
}
