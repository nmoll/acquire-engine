import { BoardSquareState } from "../../../model";
import { IBoardSquareStateContext } from "../../../model/board-square-state-context";

export interface IBoardStateScenario {
  resolve(context: IBoardSquareStateContext): BoardSquareState | false;
}
