import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { PlayerUtils } from "../utils/player-utils";
import { createJoinGameEvent } from "./events/join-game-event";
import { AcquireAppService } from "./acquire-app.service";

@customElement("acquire-waiting-room")
export class AcquireWaitingRoomElement extends LitElement {
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

  @property()
  playerIds!: string[];

  @property()
  playerId!: string;

  @property()
  hostId!: string;

  @property()
  gameId!: string;

  @property()
  gameUrl!: string;

  @property()
  isOpen = false;

  @state()
  showCopiedMessage = false;

  @state()
  isDeleting = false;

  appService = new AcquireAppService();

  onJoinGame() {
    this.dispatchEvent(createJoinGameEvent(null));
  }

  onStartGame() {
    this.dispatchEvent(new CustomEvent<void>("start-game"));
  }

  setIsOpen(isOpen: boolean) {
    this.dispatchEvent(
      new CustomEvent<boolean>("is-open-change", {
        detail: isOpen,
      })
    );
  }

  getPlayerDisplayName() {
    return PlayerUtils.getDisplayName(this.playerId);
  }

  onShareGameUrl() {
    if (!navigator.share) {
      navigator.clipboard.writeText(this.gameUrl);
      this.showCopiedMessage = true;
      setTimeout(() => {
        this.showCopiedMessage = false;
      }, 1500);
      return;
    }

    const playerName = PlayerUtils.getDisplayName(this.playerId);

    navigator.share({
      url: this.gameUrl,
      text: `
        ${playerName} would like to play a game of Acquire with you!
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

  onLeaveGame() {
    this.dispatchEvent(new CustomEvent<void>("leave-game"));
  }

  onDeleteGame() {
    this.appService.deleteGame(this.gameId, () => {
      this.isDeleting = true;
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent<void>("leave-game"));
      }, 2000);
    });
  }

  render() {
    return html`
      <acquire-page title="Waiting Room">
        <p>Game ID: <span class="text-primary">${this.gameId}</span></p>
        <ul>
          ${this.playerIds.map(
            (playerId) =>
              html`<li>
                ${PlayerUtils.getDisplayName(playerId)}
                ${this.playerId === playerId ? "(you)" : ""}
              </li>`
          )}
        </ul>

        ${this.renderSecrecy()}

        <div class="waiting-message">
          Waiting for others to join<span class="loading"></span>
        </div>
        ${!this.playerIds.includes(this.playerId)
          ? html`<button class="primary" @click="${() => this.onJoinGame()}">
              Join Game
            </button>`
          : ""}
        ${this.playerId === this.hostId
          ? html`
              <button
                class="primary"
                ?disabled="${this.playerIds.length <= 1}"
                @click="${() => this.onStartGame()}"
              >
                Ready? Start Game
              </button>
            `
          : ""}
        <button @click="${() => this.onShareGameUrl()}">
          ${this.getShareGameUrlText()}
        </button>
        <button @click="${() => this.onLeaveGame()}">Leave Game</button>
        <button class="danger" @click="${() => this.onDeleteGame()}">
          ${this.isDeleting ? "Deleting Game..." : "Delete Game"}
        </button>
      </acquire-page>
    `;
  }

  private renderSecrecy() {
    if (this.playerId !== this.hostId) {
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
            .checked="${this.isOpen}"
            @change="${() => this.setIsOpen(true)}"
          />
          <label for="open">Open</label>
        </div>
        <div>
          <input
            type="radio"
            id="closed"
            name="secrecy"
            value="false"
            .checked="${!this.isOpen}"
            @change="${() => this.setIsOpen(false)}"
          />
          <label for="closed">Closed</label>
        </div>
      </fieldset>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-waiting-room": AcquireWaitingRoomElement;
  }
}
