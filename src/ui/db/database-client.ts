import Gun, { IGunInstance } from "gun";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerAction } from "../../model/player-action";

/**
 * Signal server used to for clients to initiate a connection.
 * This is deployed on Akash Network using the public gundb/gun:latest docker image.
 *
 * Request is redirect using
 *     _redirects file for netlify
 *     proxy in vite.config.ts for dev
 */
const GUN_SIGNAL_SERVER_URL = `${document.location.origin}/api/gun`;

export class DatabaseClient {
  private db: IGunInstance;

  constructor() {
    this.db = Gun([GUN_SIGNAL_SERVER_URL]);
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
        console.log("game", JSON.parse(instance));
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
        console.log("game changed", JSON.parse(instance));
        instance ? callback(JSON.parse(instance)) : null;
      });
  }

  createGame(instance: IAcquireGameInstance) {
    this.updateGame(instance);
  }

  updateGame(instance: IAcquireGameInstance) {
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
        this.updateGame(instance);
      }
    });
  }

  startGame(gameId: string) {
    this.getGame(gameId, (instance) => {
      if (instance) {
        instance.state = "started";
        this.updateGame(instance);
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
}
