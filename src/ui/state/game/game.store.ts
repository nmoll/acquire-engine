import { Signal, signal } from "@lit-labs/preact-signals";
import { WindowService } from "../../core/window/window-service";
import { DatabaseClient } from "../../../db/database-client";
import { IAcquireGameInstance } from "../../../model/acquire-game-instance";
import { GameLoadedState } from "../../model/game-loaded-state.model";
import { PlayerAction } from "../../../model/player-action";
import { GameSeedGenerator } from "./game-seed-generator";

const GAME_ID_QUERY_PARAM = "game-id";

export class GameStore {
  gameLoadedState: Signal<GameLoadedState>;

  constructor(
    private windowService: WindowService,
    private dbClient: DatabaseClient,
    private gameSeedGenerator: GameSeedGenerator
  ) {
    this.gameLoadedState = signal({
      type: "initial",
    });

    const gameId = this.windowService.getQueryParam(GAME_ID_QUERY_PARAM);
    if (gameId) {
      this.watchGame(gameId);
    } else {
      this.gameLoadedState.value = {
        type: "initial",
      };
    }
  }

  createNewGame(hostId: string): void {
    const gameId = this.generateGameId();

    const date = new Date();
    const dateUTC = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );

    const game: IAcquireGameInstance = {
      id: gameId,
      randomSeed: this.gameSeedGenerator.generateSeed(),
      playerIds: [hostId],
      hostId: hostId,
      state: "not started",
      createdDate: dateUTC,
    };

    this.gameLoadedState.value = {
      type: "loaded",
      game,
    };

    this.windowService.setQueryParam(GAME_ID_QUERY_PARAM, gameId);

    this.dbClient.createGame(game);
    this.watchGame(gameId);
  }

  addPlayer(playerId: string) {
    if (this.gameLoadedState.value.type !== "loaded") {
      return;
    }

    this.gameLoadedState.value = {
      ...this.gameLoadedState.value,
      game: {
        ...this.gameLoadedState.value.game,
        playerIds: [...this.gameLoadedState.value.game.playerIds, playerId],
      },
    };

    this.dbClient.updateGameInstance(this.gameLoadedState.value.game);
  }

  setIsOpen(isOpen: boolean) {
    if (this.gameLoadedState.value.type !== "loaded") {
      return;
    }

    this.gameLoadedState.value = {
      ...this.gameLoadedState.value,
      game: {
        ...this.gameLoadedState.value.game,
        isOpen,
      },
    };

    this.dbClient.updateGameInstance(this.gameLoadedState.value.game);
  }

  startGame() {
    if (this.gameLoadedState.value.type !== "loaded") {
      return;
    }

    this.gameLoadedState.value = {
      ...this.gameLoadedState.value,
      game: {
        ...this.gameLoadedState.value.game,
        state: "started",
      },
    };

    this.dbClient.updateGameInstance(this.gameLoadedState.value.game);
  }

  goToGame(gameId: string) {
    this.windowService.setQueryParam(GAME_ID_QUERY_PARAM, gameId);
    this.watchGame(gameId);
  }

  leaveGame() {
    this.gameLoadedState.value = {
      type: "initial",
    };
    this.dbClient.leaveGame();
    this.windowService.setQueryParam(GAME_ID_QUERY_PARAM, null);
  }

  deleteGame(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.gameLoadedState.value.type !== "loaded") {
        return reject();
      }

      this.dbClient.deleteGame(this.gameLoadedState.value.game.id, () => {
        this.gameLoadedState.value = {
          type: "initial",
        };
        this.windowService.setQueryParam(GAME_ID_QUERY_PARAM, null);
        resolve();
      });
    });
  }

  getGameUrl(): string {
    if (this.gameLoadedState.value.type !== "loaded") {
      return "";
    }

    return `${this.windowService.getBaseUrl()}?game-id=${this.gameLoadedState.value.game.id}`;
  }

  onActionsChanged(
    gameId: string,
    callback: (actions: PlayerAction[]) => void
  ) {
    this.dbClient.onActionsChanged(gameId, callback);
  }

  watchActions(gameId: string): Signal<PlayerAction[]> {
    const actions: Signal<PlayerAction[]> = signal([]);

    this.onActionsChanged(gameId, (a) => (actions.value = a));

    return actions;
  }

  updateActions(gameId: string, actions: PlayerAction[]) {
    this.dbClient.updateActions(gameId, actions);
  }

  private generateGameId(): string {
    // create game id of 3 random number and 3 random capitalized letters
    const randomNumbers = Math.floor(Math.random() * 999);
    const randomLetters = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 3)
      .toUpperCase();

    return `${randomNumbers}${randomLetters}`;
  }

  private watchGame(gameId: string) {
    if (
      this.gameLoadedState.value.type !== "loaded" ||
      this.gameLoadedState.value.game.id !== gameId
    ) {
      this.gameLoadedState.value = {
        type: "loading",
      };

      // If game is still loading after 5 seconds, set to not found
      this.windowService.setTimeout(() => {
        if (this.gameLoadedState.value.type === "loading") {
          this.gameLoadedState.value = {
            type: "not found",
          };
        }
      }, 5000);
    }

    this.dbClient.onGameChanged(gameId, (game) => {
      if (game) {
        this.gameLoadedState.value = {
          type: "loaded",
          game,
        };
      }
    });
  }
}
