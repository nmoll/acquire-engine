import Gun, { IGunInstance } from "gun";
import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerAction } from "../model/player-action";

/**
 * Signal server used to for clients to initiate a connection.
 * This is deployed on Akash Network using the public gundb/gun:latest docker image
 */
const GUN_SIGNAL_SERVER_URL = "https://acquirebynate.com/gun";

export class DatabaseClient {
  private db: IGunInstance;

  constructor() {
    this.db = Gun([GUN_SIGNAL_SERVER_URL]);
  }

  getGameIds(callback: (gameIds: string[]) => void) {
    this.db
      .get("acquire")
      .get("games")
      .once((games: Record<string, { "#": string }>) => {
        const gameIds = games ? Object.keys(games) : [];
        callback(gameIds.filter((id) => id !== "_"));
      });
  }

  getGame(
    gameId: string,
    callback: (game: IAcquireGameInstance | null) => void
  ) {
    this.db
      .get("acquire")
      .get("games")
      .get(gameId)
      .get("instance")
      .once((instance) => {
        callback(instance ? JSON.parse(instance) : null);
      });
  }

  onGameChanged(
    gameId: string,
    callback: (game: IAcquireGameInstance | null) => void
  ) {
    this.db
      .get("acquire")
      .get("games")
      .get(gameId)
      .get("instance")
      .on((instance) => {
        instance ? callback(JSON.parse(instance)) : null;
      });
  }

  createGame(instance: IAcquireGameInstance) {
    this.updateGameInstance(instance);
  }

  updateGameInstance(instance: IAcquireGameInstance) {
    this.db
      .get("acquire")
      .get("games")
      .get(instance.id)
      .get("instance")
      .put(JSON.stringify(instance));
  }

  addPlayerToGame(playerId: string, gameId: string) {
    this.getGame(gameId, (instance) => {
      if (instance) {
        instance.playerIds.push(playerId);
        this.updateGameInstance(instance);
      }
    });
  }

  setIsOpen(gameId: string, isOpen: boolean) {
    this.getGame(gameId, (instance) => {
      if (instance) {
        instance.isOpen = isOpen;
        this.updateGameInstance(instance);
      }
    });
  }

  startGame(gameId: string) {
    this.getGame(gameId, (instance) => {
      if (instance) {
        instance.state = "started";
        this.updateGameInstance(instance);
      }
    });
  }

  onActionsChanged(
    gameId: string,
    callback: (actions: PlayerAction[]) => void
  ) {
    this.db
      .get("acquire")
      .get("games")
      .get(gameId)
      .get("actions")
      .on((actions) => {
        callback(JSON.parse(actions));
      });
  }

  updateActions(gameId: string, actions: PlayerAction[]) {
    this.db
      .get("acquire")
      .get("games")
      .get(gameId)
      .get("actions")
      .put(JSON.stringify(actions));
  }

  deleteGame(gameId: string, callback?: () => void) {
    this.db.get("acquire").get("games").get(gameId).put(null, callback);
  }
}
