import { IGameState } from "./game-state";
import { PlayerAction } from "./player-action";
import { PlayerActionResult } from "./player-action-result";

export interface ActionLog {
  action: PlayerAction;
  actionResult: PlayerActionResult;
  state: IGameState;
}
