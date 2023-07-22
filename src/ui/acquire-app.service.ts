import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerUtils } from "../utils/player-utils";
import { DatabaseClient } from "../db/database-client";

const PLAYER_ID_KEY = "acquire-player-id";

export type GameState =
  | {
      type: "initial";
    }
  | {
      type: "not created";
    }
  | {
      type: "loading";
    }
  | {
      type: "not found";
    }
  | {
      type: "loaded";
      game: IAcquireGameInstance;
    };

export class AcquireAppService {
  db: DatabaseClient;

  constructor() {
    this.db = new DatabaseClient();
  }

  getGame(gameId: string, callback: (gameState: GameState) => void) {
    let gotResponse = false;

    setTimeout(() => {
      if (!gotResponse) {
        callback({
          type: "not found",
        });
      }
    }, 3000);

    this.db.getGame(gameId, (game) => {
      gotResponse = true;
      callback(
        game
          ? {
              type: "loaded",
              game,
            }
          : {
              type: "not found",
            }
      );
    });
  }

  onGameChanged(gameId: string, callback: (gameState: GameState) => void) {
    this.db.onGameChanged(gameId, (game) => {
      callback(
        game
          ? {
              type: "loaded",
              game,
            }
          : {
              type: "not found",
            }
      );
    });
  }

  getPlayerId(): string | null {
    return localStorage.getItem(PLAYER_ID_KEY);
  }

  createPlayerId(username: string): string {
    const playerId = PlayerUtils.assignId(username);
    localStorage.setItem(PLAYER_ID_KEY, playerId);

    return playerId;
  }

  addPlayerToGame(
    playerId: string,
    gameId: string,
    callback: (instance: IAcquireGameInstance) => void
  ) {
    this.db.addPlayerToGame(playerId, gameId, callback);
  }

  startGame(
    gameId: string,
    callback: (instance: IAcquireGameInstance) => void
  ) {
    this.db.startGame(gameId, callback);
  }

  createNewGame(hostId: string): string | null {
    const gameId = this.generateGameId();
    this.db.createGame({
      id: gameId,
      randomSeed: Math.floor(Math.random() * 999),
      playerIds: [hostId],
      hostId: hostId,
      state: "not started",
    });

    const url = new URL(window.location.href);
    url.searchParams.set("game-id", gameId);
    window.history.replaceState({}, "", url.toString());

    return gameId;
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
}
