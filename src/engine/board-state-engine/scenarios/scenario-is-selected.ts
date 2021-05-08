import { BoardSquareState, BoardSquareStateType } from "../../../model";
import { IBoardSquareStateContext } from "../../../model/board-square-state-context";
import { isUnconfirmedSelection } from "../../../utils/utils";
import { IBoardStateScenario } from "./board-state-scenario";

export class ScenarioIsSelected implements IBoardStateScenario {
  resolve(context: IBoardSquareStateContext): BoardSquareState | false {
    return context.type === "turn"
      ? isUnconfirmedSelection(context.playerTurn, context.index)
        ? BoardSquareStateType.Selected()
        : false
      : false;
  }
}
