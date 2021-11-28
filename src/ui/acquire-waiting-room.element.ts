import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { PlayerUtils } from "../utils/player-utils";

export interface JoinGameEvent {
  playerId: string;
}

@customElement("acquire-waiting-room")
export class AcquireWaitingRoomElement extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    button {
      margin-top: 1rem;
      cursor: pointer;
      color: white;
      width: 350px;
      max-width: 100%;
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

    button:disabled {
      background: var(--colors-gray-800);
      border: 1px solid var(--colors-gray-800);
      color: var(--colors-gray-500);
      cursor: not-allowed;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      margin-bottom: 1rem;
    }

    .waiting-message {
      color: var(--colors-gray-500);
      margin-bottom: 1rem;
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
  gameUrl!: string;

  @state()
  showCopiedMessage = false;

  onJoinGame() {
    this.dispatchEvent(
      new CustomEvent<JoinGameEvent>("join-game", {
        detail: {
          playerId: this.playerId,
        },
      })
    );
  }

  onStartGame() {
    this.dispatchEvent(new CustomEvent<void>("start-game"));
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

  render() {
    return html`
      <img src="logo_144x144.svg" />
      <h1>Waiting Room</h1>
      <ul>
        ${this.playerIds.map(
          (playerId) => html`<li>${PlayerUtils.getDisplayName(playerId)}</li>`
        )}
      </ul>
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-waiting-room": AcquireWaitingRoomElement;
  }
}
