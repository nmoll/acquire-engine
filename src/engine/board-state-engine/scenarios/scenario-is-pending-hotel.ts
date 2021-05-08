import { BoardSquareStateType, PendingHotel } from "../../../model";
import {
  IBoardSquareStateContext,
  PlayerTurnContext,
} from "../../../model/board-square-state-context";
import {
  hasAdjacentTiles,
  isPlacedThisTurn,
  isTileAdjacentToConfirmedSelection,
} from "../../../utils/utils";
import { IBoardStateScenario } from "./board-state-scenario";

export class ScenarioIsPendingHotel implements IBoardStateScenario {
  resolve(context: IBoardSquareStateContext): PendingHotel | false {
    return context.type === "turn"
      ? this.isPendingHotel(context)
        ? BoardSquareStateType.PendingHotel()
        : false
      : false;
  }

  private isPendingHotel(context: PlayerTurnContext): boolean {
    return (
      (isPlacedThisTurn(context.playerTurn, context.index) &&
        hasAdjacentTiles(context.boardState, context.index)) ||
      isTileAdjacentToConfirmedSelection(
        context.boardState,
        context.playerTurn,
        context.index
      )
    );
  }
}
