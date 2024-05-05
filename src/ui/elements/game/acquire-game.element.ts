import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { AvailableActionsStateEngine } from "../../../engine/available-actions-state-engine/available-actions-state-engine";
import { GameStateEngine } from "../../../engine/game-state-engine/game-state-engine";
import { IGameState } from "../../../model";
import { PlayerAction } from "../../../model/player-action";
import { BoardStateFactory } from "../../../test/factory/board-state.factory";
import "./actions/acquire-game-actions.element";
import { ActionRequestEvent } from "./actions/acquire-game-actions.element";
import "./acquire-game-board.element";
import "./acquire-game-players.element";
import { TileSelectEvent } from "../../events/tile-select-event";
import { AcquireGameService } from "./acquire-game.service";
import { consume } from "@lit/context";
import { playerStoreContext } from "../../context/player.store.context";
import { PlayerStore } from "../../state/player/player.store";
import { computed, Signal, SignalWatcher } from "@lit-labs/preact-signals";
import { gameStoreContext } from "../../context/game.store.context";
import { GameStore } from "../../state/game/game.store";
import "./game-alerts/game-alerts.element";

@customElement("acquire-game")
export class AcquireGameElement extends SignalWatcher(LitElement) {
  @consume({ context: playerStoreContext })
  playerStore!: PlayerStore;

  @consume({ context: gameStoreContext })
  gameStore!: GameStore;

  actions: Signal<PlayerAction[]> | null = null;
  state: Signal<IGameState | null> = computed(() => {
    if (this.gameStore.gameLoadedState.value.type !== "loaded") {
      return null;
    }

    return GameStateEngine.computeGameState(
      this.gameStore.gameLoadedState.value.game,
      this.actions?.value ?? []
    );
  });

  @state()
  orientation: "landscape" | "portrait";

  @state()
  selectedTile: number | null = null;

  constructor() {
    super();

    AcquireGameService.getInstance().setGame(this);

    this.orientation = this.calculateOrientation();
    window.addEventListener("resize", () => {
      this.orientation = this.calculateOrientation();
    });

    (window as any).exportGame = () => {
      console.log({
        gameInstance: this.getGame(),
        actions: this.actions,
      });
    };
  }

  onConfirmTileSelect() {
    if (this.selectedTile === null) {
      return;
    }

    this.onPlayerAction({
      type: "PlaceTile",
      playerId: this.playerStore.playerId.value ?? "",
      boardSquareId: this.selectedTile,
    });

    this.selectedTile = null;
  }

  onUndoAction() {
    const game = this.getGame();
    const actions = this.actions?.value;
    if (!game || !actions) {
      return;
    }

    const action = actions.at(-1);
    if (action && action.playerId === this.getCurrentPlayerId()) {
      this.gameStore.updateActions(game.id, actions.slice(0, -1));
    }
  }

  onPlayerAction(action: PlayerAction) {
    const game = this.getGame();
    const state = this.state.value;
    const actions = this.actions?.value ?? [];

    if (
      game &&
      state &&
      AvailableActionsStateEngine.validateAction(action, state)
    ) {
      this.gameStore.updateActions(game.id, [...actions, action]);
    }
  }

  render() {
    const playerId = this.playerStore.playerId.value;
    if (!playerId) {
      return;
    }

    const game =
      this.gameStore.gameLoadedState.value.type === "loaded"
        ? this.gameStore.gameLoadedState.value.game
        : null;
    if (!game) {
      return html``;
    }

    if (game.state === "not started") {
      return html``;
    }

    if (!this.actions) {
      this.actions = this.gameStore.watchActions(game.id);
    }

    const state = this.state.value;
    if (!state) {
      return;
    }

    const availableActions =
      state.currentPlayerIdState === playerId
        ? state.availableActionsState
        : [];

    return html` <acquire-game-alerts
        .gameState="${state}"
      ></acquire-game-alerts>
      <div class="app ${this.orientation}">
        <acquire-game-players
          .players="${game.playerIds}"
          .cashState="${state.cashState}"
          .sharesState="${state.sharesState}"
          .currentPlayer="${this.getCurrentPlayerId()}"
          .playerId="${playerId}"
          .isOpen="${game.isOpen ?? false}"
          .isGameOver="${!!state.winners?.length}"
        ></acquire-game-players>

        <acquire-game-board
          .boardState="${state.boardState}"
          .availableActions="${availableActions}"
          .selectedTile="${this.selectedTile}"
          .playerTiles="${state.tileState[playerId] ?? []}"
          .isPlayerTurn="${playerId === state.currentPlayerIdState}"
          @tile-select="${(e: TileSelectEvent) => (this.selectedTile = e.tile)}"
        >
        </acquire-game-board>

        <acquire-game-actions
          .gameState="${state}"
          .playerId="${playerId}"
          .currentPlayerId="${this.getCurrentPlayerId()}"
          .winners="${state.winners}"
          .availableActionState="${state.availableActionsState}"
          .selectedTile="${this.selectedTile}"
          .previousActions="${state.previousActions}"
          @tile-select="${(e: TileSelectEvent) => (this.selectedTile = e.tile)}"
          @confirm-tile-place="${() => this.onConfirmTileSelect()}"
          @cancel-tile-place="${() => (this.selectedTile = null)}"
          @undo-action="${() => this.onUndoAction()}"
          @action-request="${(e: CustomEvent<ActionRequestEvent>) =>
            this.onPlayerAction(e.detail.action)}"
          @leave-game="${() => this.gameStore.leaveGame()}"
        ></acquire-game-actions>
      </div>`;
  }

  appendGameObject(el: HTMLElement) {
    this.shadowRoot?.appendChild(el);
  }

  hasGameObject(selector: keyof HTMLElementTagNameMap) {
    return !!this.shadowRoot?.querySelector(selector);
  }

  private getGame() {
    return this.gameStore.gameLoadedState.value.type === "loaded"
      ? this.gameStore.gameLoadedState.value.game
      : null;
  }

  private getCurrentPlayerId(): string {
    return this.state.value?.currentPlayerIdState ?? "";
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
    console.log(
      this.state.value
        ? BoardStateFactory.createDiagram(this.state.value.boardState)
        : "(empty)"
    );
  }

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
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game": AcquireGameElement;
  }
}
