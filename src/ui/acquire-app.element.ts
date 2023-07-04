import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { AcquireAppService, GameState } from "./acquire-app.service";
import "./acquire-create-game.element";
import "./acquire-create-username.element";
import { SaveUsernameEvent } from "./acquire-create-username.element";
import "./acquire-waiting-room.element";
import { JoinGameEvent as WaitingRoomJoinGameEvent } from "./acquire-waiting-room.element";
import { JoinGameEvent as JoinGameByIdEvent } from "./acquire-create-game.element";
import "./game/acquire-game.element";

@customElement("acquire-app")
export class AcquireAppElement extends LitElement {
  static styles = css``;

  private acquireAppService: AcquireAppService;

  @state()
  playerId: string | null;

  @state()
  gameState: GameState = {
    type: "initial",
  };

  constructor() {
    super();

    this.acquireAppService = new AcquireAppService();
    this.playerId = this.acquireAppService.getPlayerId();

    const gameId = new URLSearchParams(window.location.search).get("game-id");
    if (!gameId) {
      this.gameState = {
        type: "not created",
      };
    } else {
      this.acquireAppService.onGameChanged(gameId, (gameState) => {
        this.gameState = gameState;
      });
    }
  }

  createPlayer(username: string) {
    this.playerId = this.acquireAppService.createPlayerId(username);
  }

  addPlayerToGame(playerId: string, gameId: string) {
    this.acquireAppService.addPlayerToGame(playerId, gameId);
  }

  navigateToGame(gameId: string) {
    window.location.href = this.getGameUrl(gameId);
  }

  goToHome() {
    window.location.href = location.origin;
  }

  createNewGame(hostId: string) {
    const gameId = this.acquireAppService.createNewGame(hostId);
    if (gameId) {
      this.acquireAppService.onGameChanged(gameId, (gameState) => {
        this.gameState = gameState;
      });
    }
  }

  startGame(gameId: string) {
    this.acquireAppService.startGame(gameId);
  }

  getGameUrl(gameId: string): string {
    return `${location.origin}?game-id=${gameId}`;
  }

  render() {
    const playerId = this.playerId;
    if (!playerId) {
      return html`<acquire-create-username
        @save="${(e: CustomEvent<SaveUsernameEvent>) =>
          this.createPlayer(e.detail.username)}"
      ></acquire-create-username>`;
    }
    const gameState = this.gameState;
    switch (gameState.type) {
      case "initial":
        return html`initial state`;
      case "not created":
        return html`<acquire-create-game
          @create="${() => this.createNewGame(playerId)}"
          @join="${(event: CustomEvent<JoinGameByIdEvent>) =>
            this.navigateToGame(event.detail.gameId)}"
        ></acquire-create-game>`;
      case "loading":
        return html`Loading game...`;
      case "not found":
        return html`No game found!
          <button @click="${() => this.goToHome()}">Go to home</button>`;
      case "loaded":
        switch (gameState.game.state) {
          case "not started":
            return html`<acquire-waiting-room
              .playerIds="${gameState.game.playerIds}"
              .playerId="${playerId}"
              .hostId="${gameState.game.hostId}"
              .gameId="${gameState.game.id}"
              .gameUrl="${this.getGameUrl(gameState.game.id)}"
              @join-game="${(e: CustomEvent<WaitingRoomJoinGameEvent>) =>
                this.addPlayerToGame(e.detail.playerId, gameState.game.id)}"
              @start-game="${() => this.startGame(gameState.game.id)}"
            ></acquire-waiting-room>`;
          case "started":
            return html`<acquire-game
              .game="${gameState.game}"
              .playerId="${playerId}"
            ></acquire-game>`;
          case "finished":
            return html`Game finished!`;
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-app": AcquireAppElement;
  }
}
