import { BoardSquareState, BoardSquareStateType } from "../../../model";
import {
  IBoardSquareStateContext,
  PlayerActionContext,
  PlayerTurnContext,
} from "../../../model/board-square-state-context";
import { isPlacedThisTurn } from "../../../utils/utils";
import { IBoardStateScenario } from "./board-state-scenario";

export class ScenarioHasTile implements IBoardStateScenario {
  resolve(context: IBoardSquareStateContext): BoardSquareState | false {
    return context.type === "turn"
      ? this.resolveTurnContext(context)
      : this.resolveActionContext(context);
  }

  resolveTurnContext(context: PlayerTurnContext): BoardSquareState | false {
    return isPlacedThisTurn(context.playerTurn, context.index)
      ? BoardSquareStateType.HasTile()
      : false;
  }

  resolveActionContext(context: PlayerActionContext): BoardSquareState | false {
    return context.playerAction.type === "PlaceTile" &&
      context.playerAction.boardSquareId === context.index
      ? BoardSquareStateType.HasTile()
      : false;
  }
}
