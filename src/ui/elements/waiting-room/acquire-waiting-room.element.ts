import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { PlayerUtils } from "../../../utils/player-utils";
import { consume } from "@lit/context";
import { gameStoreContext } from "../../context/game.store.context";
import { GameStore } from "../../state/game/game.store";
import { playerStoreContext } from "../../context/player.store.context";
import { PlayerStore } from "../../state/player/player.store";
import { IAcquireGameInstance } from "../../../model/acquire-game-instance";
import { SignalWatcher } from "@lit-labs/preact-signals";

@customElement("acquire-waiting-room")
export class AcquireWaitingRoomElement extends SignalWatcher(LitElement) {
  @consume({ context: playerStoreContext })
  playerStore!: PlayerStore;

  @consume({ context: gameStoreContext })
  gameStore!: GameStore;

  @state()
  showCopiedMessage = false;

  @state()
  isDeleting = false;

  onShareGameUrl() {
    const gameUrl = this.gameStore.getGameUrl();

    if (!navigator.share) {
      navigator.clipboard.writeText(gameUrl);
      this.showCopiedMessage = true;
      setTimeout(() => {
        this.showCopiedMessage = false;
      }, 1500);
      return;
    }

    navigator.share({
      url: gameUrl,
      text: `
        ${this.playerStore.playerName.value} would like to play a game of Acquire with you!
        Click the link below to join.
      `,
    });
  }

  getShareGameUrlText() {
    if (this.showCopiedMessage) {
      return "Copied!";
    }

    return !!navigator.share ? "Share Game URL" : "Copy Game URL";
  }

  render() {
    const playerId = this.playerStore.playerId.value;
    const gameLoadedState = this.gameStore.gameLoadedState.value;

    if (!playerId || gameLoadedState.type !== 'loaded') {
      return;
    }

    const game = gameLoadedState.game;

    return html`
      <acquire-page title="Waiting Room">
        <p>Game ID: <span class="text-primary">${game.id}</span></p>
        <ul>
          ${game.playerIds.map(
      (id) =>
        html`<li>
                ${PlayerUtils.getDisplayName(id)}
                ${playerId === id ? "(you)" : ""}
              </li>`
    )}
        </ul>

        ${this.renderSecrecy(game)}

        <div class="waiting-message">
          Waiting for others to join<span class="loading"></span>
        </div>
        ${!game.playerIds.includes(playerId)
        ? html`<button class="primary" @click="${() => this.gameStore.addPlayer(playerId)}">
              Join Game
            </button>`
        : ""}
        ${playerId === game.hostId
        ? html`
              <button
                class="primary"
                ?disabled="${game.playerIds.length <= 1}"
                @click="${() => this.gameStore.startGame()}"
              >
                Ready? Start Game
              </button>
            `
        : ""}
        <button @click="${() => this.onShareGameUrl()}">
          ${this.getShareGameUrlText()}
        </button>
        <button @click="${() => this.gameStore.leaveGame()}">Leave Game</button>
        <button class="danger" @click="${() => this.gameStore.deleteGame()}">
          ${this.isDeleting ? "Deleting Game..." : "Delete Game"}
        </button>
      </acquire-page>
    `;
  }

  private renderSecrecy(game: IAcquireGameInstance) {
    if (this.playerStore.playerId.value !== game.hostId) {
      return;
    }

    return html`
      <fieldset>
        <legend>Stock/Cash Secrecy</legend>
        <div>
          <input
            type="radio"
            id="open"
            name="secrecy"
            value="true"
            .checked="${game.isOpen}"
            @change="${() => this.gameStore.setIsOpen(true)}"
          />
          <label for="open">Open</label>
        </div>
        <div>
          <input
            type="radio"
            id="closed"
            name="secrecy"
            value="false"
            .checked="${!game.isOpen}"
            @change="${() => this.gameStore.setIsOpen(false)}"
          />
          <label for="closed">Closed</label>
        </div>
      </fieldset>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    button {
      margin-top: 1rem;
      cursor: pointer;
      color: white;
      width: 100%;
      padding: 15px 10px;
      font-size: 1.25rem;
    }

    button {
      background: var(--colors-gray-400);
      border: 1px solid var(--colors-gray-400);
      color: var(--colors-gray-900);
    }

    button.primary {
      background: var(--colors-primary);
      border: 1px solid var(--colors-primary);
    }

    button.danger {
      background: var(--colors-red-500);
      border: 1px solid var(--colors-red-500);
    }

    button:disabled {
      background: var(--colors-gray-800);
      border: 1px solid var(--colors-gray-800);
      color: var(--colors-gray-500);
      cursor: not-allowed;
    }

    .text-primary {
      color: var(--colors-primary);
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      margin-bottom: 1rem;
    }

    p {
      margin-top: 0;
    }

    fieldset {
      width: 80%;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-around;
    }

    .waiting-message {
      color: var(--colors-gray-500);
      margin-top: 0.75rem;
    }

    .loading:after {
      position: absolute;
      overflow: hidden;
      display: inline-block;
      vertical-align: bottom;
      -webkit-animation: ellipsis steps(4, end) 2s infinite;
      animation: ellipsis steps(4, end) 2s infinite;
      content: "\\2026"; /* ascii code for the ellipsis character */
      width: 0px;
    }

    @keyframes ellipsis {
      to {
        width: 20px;
      }
    }

    @-webkit-keyframes ellipsis {
      to {
        width: 20px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-waiting-room": AcquireWaitingRoomElement;
  }
}
