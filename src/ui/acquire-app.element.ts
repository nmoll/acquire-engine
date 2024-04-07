import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { AcquireAppService, GameState } from "./acquire-app.service";
import "./acquire-create-game.element";
import "./acquire-create-username.element";
import { SaveUsernameEvent } from "./acquire-create-username.element";
import "./acquire-waiting-room.element";
import "./game/game-loading.element";
import "./game/acquire-game.element";
import "./game/game-not-found.element";
import { JoinGameEvent } from "./events/join-game-event";

@customElement("acquire-app")
export class AcquireAppElement extends LitElement {
  static styles = css`
    :host {
      height: 100%;
    }
  `;

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
      this.acquireAppService.getGame(gameId, (gameState) => {
        this.gameState = gameState;
      });
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

  setIsOpen(gameId: string, isOpen: boolean) {
    this.acquireAppService.setIsOpen(gameId, isOpen);
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
      this.acquireAppService.getGame(gameId, (gameState) => {
        this.gameState = gameState;
      });
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
        return html``;
      case "not created":
        return html`<acquire-create-game
          .playerId="${playerId}"
          @create="${() => this.createNewGame(playerId)}"
          @join-game="${(e: JoinGameEvent) => this.navigateToGame(e.gameId!)}"
        ></acquire-create-game>`;
      case "loading":
        return html`<acquire-game-loading />`;
      case "not found":
        return html`<acquire-game-not-found
          @leave-game="${() => this.goToHome()}"
        />`;
      case "loaded":
        switch (gameState.game.state) {
          case "not started":
            return html`<acquire-waiting-room
              .playerIds="${gameState.game.playerIds}"
              .playerId="${playerId}"
              .hostId="${gameState.game.hostId}"
              .gameId="${gameState.game.id}"
              .gameUrl="${this.getGameUrl(gameState.game.id)}"
              .isOpen="${gameState.game.isOpen || false}"
              @is-open-change="${(event: CustomEvent<boolean>) =>
                this.setIsOpen(gameState.game.id, event.detail)}"
              @join-game="${() =>
                this.addPlayerToGame(this.playerId!, gameState.game.id)}"
              @start-game="${() => this.startGame(gameState.game.id)}"
              @leave-game="${() => this.goToHome()}"
            ></acquire-waiting-room>`;
          case "started":
            return html`<acquire-game
              .game="${gameState.game}"
              .playerId="${playerId}"
              @leave-game="${() => this.goToHome()}"
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
