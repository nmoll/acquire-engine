import { BoardSquareState, BoardSquareStateType } from "../../../model";
import { IBoardSquareStateContext } from "../../../model/board-square-state-context";
import {
  hasAdjacentTiles,
  isPlacedThisTurn,
  isTileAdjacentToConfirmedSelection,
} from "../../../utils/utils";
import { IBoardStateScenario } from "./board-state-scenario";

export class ScenarioIsPendingHotel implements IBoardStateScenario {
  resolve(context: IBoardSquareStateContext): BoardSquareState | false {
    return (isPlacedThisTurn(context.playerTurn, context.index) &&
      hasAdjacentTiles(context.boardState, context.index)) ||
      isTileAdjacentToConfirmedSelection(
        context.boardState,
        context.playerTurn,
        context.index
      )
      ? BoardSquareStateType.PendingHotel()
      : false;
  }
}
