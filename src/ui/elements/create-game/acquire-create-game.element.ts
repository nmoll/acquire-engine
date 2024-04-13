import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../layout/acquire-page.element";
import { consume } from "@lit/context";
import { playerStoreContext } from "../../context/player.store.context";
import { PlayerStore } from "../../state/player/player.store";
import { gameStoreContext } from "../../context/game.store.context";
import { GameStore } from "../../state/game/game.store";

@customElement("acquire-create-game")
export class AcquireCreateGameElement extends LitElement {
  @consume({ context: playerStoreContext })
  playerStore!: PlayerStore;

  @consume({ context: gameStoreContext })
  gameStore!: GameStore;

  @state()
  isJoinGameFormVisible = false;

  @state()
  gameId = "";

  render() {
    const playerId = this.playerStore.playerId.value;
    if (!playerId) {
      return;
    }

    if (this.isJoinGameFormVisible) {
      return html`
        <acquire-page>
          <form>
            <input
              id="game-id"
              type="text"
              @input="${() => this.gameId = this.gameIdInput.value.toUpperCase()}"
              placeholder="Game ID"
            />
            <button
              ?disabled="${!this.gameId}"
              @click="${() => {
          if (this.gameId) {
            this.gameStore.goToGame(this.gameId)
          }
        }
        }"
              type="button"
              class="primary"
              style="margin-top: 1rem"
            >
              Join game
            </button>
            <button
              @click="${() => (this.isJoinGameFormVisible = false)}"
              style="margin-top: 1rem"
            >
              Cancel
            </button>
          </form>
        </acquire-page>
      `;
    }

    return html`
      <acquire-page>
        <button @click="${() => this.gameStore.createNewGame(playerId)}" class="primary">
          Start new game
        </button>
        <button
          style="margin-top: 1rem;"
          @click="${() => (this.isJoinGameFormVisible = true)}"
          class="primary"
        >
          Join game with ID
        </button>
      </acquire-page>
    `;
  }

  // private renderLobbyGames() {
  //   if (this.lobbyState.type === "loading") {
  //     return html`<div class="muted">Looking for games...</div>`;
  //   }

  //   const games = this.lobbyState.games.map((game) => {
  //     return html`
  //       <button class="game" @click="${() => this.dispatchEvent(createJoinGameEvent(game.id))}">
  //         <div class="game__players">
  //           ${game.playerIds.map(
  //       (p) =>
  //         html`<span>
  //                 ${PlayerUtils.getDisplayName(p)}
  //                 ${this.playerStore.playerId.value === p ? "(you)" : ""}
  //               </span>`
  //     )}
  //         </div>
  //         <span class="game__id"> ${game.id} </span>
  //       </button>
  //     `;
  //   });

  //   if (!games.length) {
  //     return html`<div class="muted">No games found.</div>`;
  //   }

  //   return html`<div class="lobby-games">${games}</div>`;
  // }

  private get gameIdInput(): HTMLInputElement {
    return this.shadowRoot!.getElementById("game-id") as HTMLInputElement;
  }

  static styles = css`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  button {
    cursor: pointer;
    color: var(--colors-gray-300);
    background: transparent;
    border: 1px solid var(--colors-gray-300);
    width: 100%;
    padding: 15px 10px;
    font-size: 1.25rem;
  }

  button.primary {
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

  .lobby {
    width: 100%;
    box-sizing: border-box;
    margin-top: 2rem;
    text-align: center;
  }

  .lobby-games {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-sizing: border-box;
    width: 100%;
  }

  .game {
    border: 1px solid var(--colors-gray-700);
    background: var(--colors-gray-800);
    border-radius: 0.25rem;
    padding: 1rem;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .game__players {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: start;
  }

  .refresh-btn {
    border-color: var(--colors-gray-700);
    background: var(--colors-gray-900);
    width: auto;
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    border-radius: 0.5rem;
  }

  .game__id {
    font-size: 0.875rem;
    color: var(--colors-gray-500);
  }

  .muted {
    color: var(--colors-gray-500);
  }
`;
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-create-game": AcquireCreateGameElement;
  }
}
