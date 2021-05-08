import { BoardSquareState } from "../../../model";
import { PlayerActionContext } from "../../../model/player-action-context";

export interface IBoardStateScenario {
  resolve(context: PlayerActionContext): BoardSquareState | false;
}
