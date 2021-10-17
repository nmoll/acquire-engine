import { BoardSquareState } from "../../../model";
import { PlayerActionContext } from "../../../model/player-action-context";

export type IBoardStateScenario = (
  context: PlayerActionContext
) => BoardSquareState | false;
