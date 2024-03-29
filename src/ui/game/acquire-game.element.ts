import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { AvailableActionsStateEngine } from "../../engine/available-actions-state-engine/available-actions-state-engine";
import { GameStateEngine } from "../../engine/game-state-engine/game-state-engine";
import { IGameState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerAction } from "../../model/player-action";
import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { DatabaseClient } from "../../db/database-client";
import "./actions/acquire-game-actions.element";
import { ActionRequestEvent } from "./actions/acquire-game-actions.element";
import "./acquire-game-board.element";
import "./acquire-game-players.element";
import { TileSelectEvent } from "../events/tile-select-event";
import { createLeaveGameEvent } from "../events/leave-game-event";
import { AcquireGameService } from "./acquire-game.service";

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

  @state()
  selectedTile: number | null = null;

  private state!: IGameState;
  private service: DatabaseClient;

  constructor() {
    super();

    AcquireGameService.getInstance().setGame(this);

    this.service = new DatabaseClient();

    this.orientation = this.calculateOrientation();
    window.addEventListener("resize", () => {
      this.orientation = this.calculateOrientation();
    });

    (window as any).exportGame = () => {
      console.log({
        gameInstance: this.game,
        actions: this.actions,
      });
    };
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

  onConfirmTileSelect() {
    if (this.selectedTile === null) {
      return;
    }

    this.onPlayerAction({
      type: "PlaceTile",
      playerId: this.playerId,
      boardSquareId: this.selectedTile,
    });

    this.selectedTile = null;
  }

  onUndoAction() {
    const action = this.actions.at(-1);
    if (action && action.playerId === this.getCurrentPlayerId()) {
      const actions = this.actions.slice(0, -1);
      this.service.updateActions(this.game.id, actions);
    }
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

    const availableActions =
      this.state.currentPlayerIdState === this.playerId
        ? this.state.availableActionsState
        : [];

    return html`<div class="app ${this.orientation}">
      <acquire-game-players
        .players="${this.game.playerIds}"
        .cashState="${this.state.cashState}"
        .sharesState="${this.state.sharesState}"
        .currentPlayer="${this.getCurrentPlayerId()}"
        .playerId="${this.playerId}"
      ></acquire-game-players>

      <acquire-game-board
        .boardState="${this.state.boardState}"
        .availableActions="${availableActions}"
        .selectedTile="${this.selectedTile}"
        .playerTiles="${this.state.tileState[this.playerId] ?? []}"
        .isPlayerTurn="${this.playerId === this.state.currentPlayerIdState}"
        @tile-select="${(e: TileSelectEvent) => (this.selectedTile = e.tile)}"
      >
      </acquire-game-board>

      <acquire-game-actions
        .gameState="${this.state}"
        .playerId="${this.playerId}"
        .currentPlayerId="${this.getCurrentPlayerId()}"
        .winners="${this.state.winners}"
        .availableActionState="${this.state.availableActionsState}"
        .selectedTile="${this.selectedTile}"
        .previousActions="${this.state.previousActions}"
        @tile-select="${(e: TileSelectEvent) => (this.selectedTile = e.tile)}"
        @confirm-tile-place="${() => this.onConfirmTileSelect()}"
        @cancel-tile-place="${() => (this.selectedTile = null)}"
        @undo-action="${() => this.onUndoAction()}"
        @action-request="${(e: CustomEvent<ActionRequestEvent>) =>
          this.onPlayerAction(e.detail.action)}"
        @leave-game="${() => this.dispatchEvent(createLeaveGameEvent())}"
      ></acquire-game-actions>
    </div>`;
  }

  appendGameObject(el: HTMLElement) {
    this.shadowRoot?.appendChild(el);
  }

  hasGameObject(selector: keyof HTMLElementTagNameMap) {
    return !!this.shadowRoot?.querySelector(selector);
  }

  private getCurrentPlayerId(): string {
    return this.state.currentPlayerIdState ?? "";
  }

  private calculateOrientation(): "landscape" | "portrait" {
    return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
  }

  /**
   * Prints the current state of the game for debugging
   */
  debug() {
    console.log("-- Actions -- ");
    console.log(this.actions);

    console.log("-- Game state --");
    console.log(this.state);

    console.log("-- Board ASCII Diagram --");
    console.log(BoardStateFactory.createDiagram(this.state.boardState));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game": AcquireGameElement;
  }
}
