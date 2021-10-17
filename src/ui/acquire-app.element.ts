import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { AcquireAppService, GameState } from "./acquire-app.service";
import "./acquire-button.element";
import "./acquire-create-username.element";
import { SaveUsernameEvent } from "./acquire-create-username.element";
import "./acquire-game.element";
import "./acquire-waiting-room.element";
import { JoinGameEvent } from "./acquire-waiting-room.element";

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

  joinGame(playerId: string, gameId: string) {
    this.acquireAppService.addPlayerToGame(playerId, gameId);
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
        return html`<div>
          Start a new game:
          <acquire-button @click="${() => this.createNewGame(playerId)}"
            >New Game</acquire-button
          >
        </div>`;
      case "loading":
        return html`Loading game...`;
      case "not found":
        return html`No game found!`;
      case "loaded":
        switch (gameState.game.state) {
          case "not started":
            return html`<acquire-waiting-room
              .playerIds="${gameState.game.playerIds}"
              .playerId="${playerId}"
              .hostId="${gameState.game.hostId}"
              .gameUrl="${this.getGameUrl(gameState.game.id)}"
              @join-game="${(e: CustomEvent<JoinGameEvent>) =>
                this.joinGame(e.detail.playerId, gameState.game.id)}"
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
