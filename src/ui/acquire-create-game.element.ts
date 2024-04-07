import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./acquire-page.element";
import { createJoinGameEvent } from "./events/join-game-event";
import { AcquireAppService } from "./acquire-app.service";
import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerUtils } from "../utils/player-utils";

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

  @property()
  playerId!: string;

  @state()
  isJoinGameFormVisible = false;

  @state()
  gameId = "";

  @state()
  lobbyState:
    | { type: "loading" }
    | { type: "loaded"; games: IAcquireGameInstance[] } = {
    type: "loading",
  };

  private appService: AcquireAppService;

  constructor() {
    super();

    this.appService = new AcquireAppService();
    setTimeout(() => {
      this.loadGames();
    }, 500);
  }

  private loadGames() {
    if (!this.playerId) {
      return;
    }

    this.lobbyState = {
      type: "loading",
    };

    let games: IAcquireGameInstance[] = [];

    this.appService.findGamesNotStarted((game) => {
      games.push(game);
      games.sort((a, b) => (b.createdDate ?? 0) - (a.createdDate ?? 0));
    });

    let attempt = 0;
    const waitAndSetGames = () => {
      if (!games.length && attempt < 10) {
        setTimeout(() => {
          attempt++;
          waitAndSetGames();
        }, 300 * attempt);
      } else {
        this.lobbyState = {
          type: "loaded",
          games,
        };
      }
    };

    waitAndSetGames();
  }

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
              @click="${() => this.onJoinGame(this.gameId)}"
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
        <button @click="${() => this.onCreateNewGame()}" class="primary">
          Start new game
        </button>
        <button
          style="margin-top: 1rem;"
          @click="${() => (this.isJoinGameFormVisible = true)}"
          class="primary"
        >
          Join game with ID
        </button>

        <div class="lobby">
          <div style="display: flex; align-items: center;">
            <p style="flex: 1 1 0%">Join an existing game:</p>
            ${this.lobbyState.type !== "loading"
              ? html`<button
                  class="refresh-btn"
                  @click="${() => this.loadGames()}"
                >
                  Refresh
                </button>`
              : ""}
          </div>
          ${this.renderLobbyGames()}
        </div>
      </acquire-page>
    `;
  }

  private renderLobbyGames() {
    if (this.lobbyState.type === "loading") {
      return html`<div class="muted">Looking for games...</div>`;
    }

    const games = this.lobbyState.games.map((game) => {
      return html`
        <button class="game" @click="${() => this.onJoinGame(game.id)}">
          <div class="game__players">
            ${game.playerIds.map(
              (p) =>
                html`<span>
                  ${PlayerUtils.getDisplayName(p)}
                  ${this.playerId === p ? "(you)" : ""}
                </span>`
            )}
          </div>
          <span class="game__id"> ${game.id} </span>
        </button>
      `;
    });

    if (!games.length) {
      return html`<div class="muted">No games found.</div>`;
    }

    return html`<div class="lobby-games">${games}</div>`;
  }

  private onCreateNewGame() {
    this.dispatchEvent(new CustomEvent<void>("create"));
  }

  private onJoinGame(gameId: string) {
    if (!gameId) {
      return;
    }

    this.dispatchEvent(createJoinGameEvent(gameId));
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
