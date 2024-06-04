import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerAction } from "../model/player-action";

export interface DatabaseClient {
  getGame(
    gameId: string,
    callback: (game: IAcquireGameInstance | null) => void
  ): void;
  onGameChanged(
    gameId: string,
    callback: (game: IAcquireGameInstance | null) => void
  ): void;
  createGame(game: IAcquireGameInstance): void;
  updateGameInstance(game: IAcquireGameInstance): void;
  deleteGame(gameId: string, callback?: () => void): void;
  onActionsChanged(
    gameId: string,
    callback: (actions: PlayerAction[]) => void
  ): void;
  updateActions(gameId: string, actions: PlayerAction[]): void;
  leaveGame(): void;
}
