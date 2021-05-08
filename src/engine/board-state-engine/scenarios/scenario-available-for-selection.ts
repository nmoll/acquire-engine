import { BoardSquareState, BoardSquareStateType } from "../../../model";
import {
  IBoardSquareStateContext,
  PlayerActionContext,
  PlayerTurnContext,
} from "../../../model/board-square-state-context";
import { IBoardStateScenario } from "./board-state-scenario";

export class ScenarioAvailableForSelection implements IBoardStateScenario {
  resolve(context: IBoardSquareStateContext): BoardSquareState | false {
    return this.playerHasTile(context)
      ? BoardSquareStateType.AvailableForSelection()
      : false;
  }

  private playerHasTile(context: IBoardSquareStateContext): boolean {
    return context.type === "turn"
      ? this.playerHasTileOnTurn(context)
      : this.playerHasTileOnAction(context);
  }

  private playerHasTileOnAction(context: PlayerActionContext): boolean {
    return false;
  }

  private playerHasTileOnTurn(context: PlayerTurnContext): boolean {
    return (
      context.playerTurn.boardSquareSelectedState.type !== "Confirmed" &&
      context.playerTurn.boardSquareOptionIds.includes(context.index)
    );
  }
}
