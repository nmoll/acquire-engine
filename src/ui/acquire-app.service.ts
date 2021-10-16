import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { IPlayer } from "../model/player";
import { PlayerUtils } from "../utils/player-utils";
import { FirebaseService } from "./firebase.service";

const PLAYER_KEY = "acquire-player";

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

  getPlayer(): IPlayer | null {
    const playerString = localStorage.getItem(PLAYER_KEY);
    return playerString ? JSON.parse(playerString) : null;
  }

  createPlayer(username: string): IPlayer {
    const player = {
      id: PlayerUtils.assignId(username),
      name: username,
    };
    localStorage.setItem(PLAYER_KEY, JSON.stringify(player));

    return player;
  }

  addPlayerToGame(playerId: string, gameId: string) {
    this.firebaseService.addPlayerToGame(playerId, gameId);
  }

  startGame(gameId: string) {
    this.firebaseService.startGame(gameId);
  }

  createNewGame(host: IPlayer): string | null {
    const gameId = `${Math.round(Math.random() * 9999999)}`;
    this.firebaseService.createGame({
      id: gameId,
      randomSeed: Math.floor(Math.random() * 999),
      playerIds: [host.id],
      hostId: host.id,
      state: "not started",
    });

    const url = new URL(window.location.href);
    url.searchParams.set("game-id", gameId);
    window.history.replaceState({}, "", url.toString());

    return gameId;
  }
}
