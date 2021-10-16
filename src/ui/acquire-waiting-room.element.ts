import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface JoinGameEvent {
  playerId: string;
}

@customElement("acquire-waiting-room")
export class AcquireWaitingRoomElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
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

  render() {
    return html`
      <div>
        <h2>Players:</h2>
        <ul>
          ${this.playerIds.map((playerId) => html`<li>${playerId}</li>`)}
        </ul>
        ${!this.playerIds.includes(this.playerId)
          ? html`<button @click="${() => this.onJoinGame()}">Join Game</button>`
          : ""}
        ${this.playerId === this.hostId
          ? html`
              <button
                ?disabled="${this.playerIds.length <= 1}"
                @click="${() => this.onStartGame()}"
              >
                Start Game
              </button>
            `
          : ""}
        <div style="margin-top: 20px">
          Share the game link with your friends:
        </div>
        <div>${this.gameUrl}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-waiting-room": AcquireWaitingRoomElement;
  }
}
