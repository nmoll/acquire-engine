import { ActionLog } from "./action-log";
import { IGameState } from "./game-state";
import { Hotel } from "./hotel";
import { Merge, PlaceTile } from "./player-action";
import { PlayerActionResult } from "./player-action-result";

export interface MergeContext {
  action: PlaceTile | Merge;
  gameState: IGameState;
  minority: Hotel;
  majority: Hotel;
}

export interface TurnContext {
  playerIds: string[];
  actionResult: PlayerActionResult;
  mergeContext: MergeContext | null;
  turnLog: ActionLog[];
}
