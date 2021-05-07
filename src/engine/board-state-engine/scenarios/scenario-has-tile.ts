import { BoardSquareState, BoardSquareStateType } from "../../../model";
import { IBoardSquareStateContext } from "../../../model/board-square-state-context";
import { isPlacedThisTurn } from "../../../utils/utils";
import { IBoardStateScenario } from "./board-state-scenario";

export class ScenarioHasTile implements IBoardStateScenario {
  resolve(context: IBoardSquareStateContext): BoardSquareState | false {
    return isPlacedThisTurn(context.playerTurn, context.index)
      ? BoardSquareStateType.HasTile()
      : false;
  }
}
