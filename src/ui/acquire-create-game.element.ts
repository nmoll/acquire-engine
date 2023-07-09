import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./acquire-page.element";
import { createJoinGameEvent } from "./events/join-game-event";

@customElement("acquire-create-game")
export class AcquireCreateGameElement extends LitElement {
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
      color: var(--colors-gray-300);
      background: transparent;
      border: 1px solid var(--colors-gray-300);
      width: 100%;
      padding: 15px 10px;
      font-size: 1.25rem;
    }

    button.primary {
      margin-top: 1rem;
      cursor: pointer;
      background: var(--colors-primary);
      border: 1px solid var(--colors-primary);
      color: var(--colors-gray-900);
      width: 100%;
      padding: 15px 10px;
      font-size: 1.25rem;
    }

    button:disabled {
      background: var(--colors-gray-800);
      border: 1px solid var(--colors-gray-800);
      color: var(--colors-gray-500);
      cursor: not-allowed;
    }

    input {
      width: 100%;
      padding: 15px 10px;
      font-size: 1.25rem;
      box-sizing: border-box;
      background: var(--colors-gray-900);
      border: 1px solid var(--colors-gray-700);
      color: var(--colors-gray-100);
      text-transform: uppercase;
    }
  `;

  @state()
  isJoinGameFormVisible = false;

  @state()
  gameId = "";

  render() {
    if (this.isJoinGameFormVisible) {
      return html`
        <acquire-page>
          <form>
            <input
              id="game-id"
              type="text"
              @input="${this.onGameIdInputChange}"
              placeholder="Game ID"
            />
            <button
              ?disabled="${!this.gameId}"
              @click="${() => this.onJoinGame()}"
              type="button"
              class="primary"
            >
              Join game
            </button>
            <button @click="${() => (this.isJoinGameFormVisible = false)}">
              Cancel
            </button>
          </form>
        </acquire-page>
      `;
    }

    return html`
      <acquire-page>
        <button @click="${() => this.onCreateNewGame()}" class="primary">
          Start new game
        </button>
        <button
          @click="${() => (this.isJoinGameFormVisible = true)}"
          class="primary"
        >
          Join existing game
        </button>
      </acquire-page>
    `;
  }

  private onCreateNewGame() {
    this.dispatchEvent(new CustomEvent<void>("create"));
  }

  private onJoinGame() {
    if (!this.gameId) {
      return;
    }

    this.dispatchEvent(createJoinGameEvent(this.gameId));
  }

  private onGameIdInputChange() {
    this.gameId = this.gameIdInput.value.toUpperCase();
  }

  private get gameIdInput(): HTMLInputElement {
    return this.shadowRoot!.getElementById("game-id") as HTMLInputElement;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-create-game": AcquireCreateGameElement;
  }
}
