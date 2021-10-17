import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerUtils } from "../utils/player-utils";
import { FirebaseService } from "./firebase.service";

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
  firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  getGame(gameId: string, callback: (gameState: GameState) => void) {
    this.firebaseService.getGame(gameId, (game) =>
      callback(
        game
          ? {
              type: "loaded",
              game,
            }
          : {
              type: "not found",
            }
      )
    );
  }

  onGameChanged(gameId: string, callback: (gameState: GameState) => void) {
    callback({
      type: "loading",
    });
    this.firebaseService.onGameChanged(gameId, (game) =>
      callback(
        game
          ? {
              type: "loaded",
              game,
            }
          : {
              type: "not found",
            }
      )
    );
  }

  getPlayerId(): string | null {
    return localStorage.getItem(PLAYER_ID_KEY);
  }

  createPlayerId(username: string): string {
    const playerId = PlayerUtils.assignId(username);
    localStorage.setItem(PLAYER_ID_KEY, playerId);

    return playerId;
  }

  addPlayerToGame(playerId: string, gameId: string) {
    this.firebaseService.addPlayerToGame(playerId, gameId);
  }

  startGame(gameId: string) {
    this.firebaseService.startGame(gameId);
  }

  createNewGame(hostId: string): string | null {
    const gameId = `${Math.round(Math.random() * 9999999)}`;
    this.firebaseService.createGame({
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
}
