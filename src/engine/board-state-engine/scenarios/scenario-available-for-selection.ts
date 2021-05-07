import { BoardSquareState, BoardSquareStateType } from "../../../model";
import { IBoardSquareStateContext } from "../../../model/board-square-state-context";
import { IBoardStateScenario } from "./board-state-scenario";

export class ScenarioAvailableForSelection implements IBoardStateScenario {
  resolve(context: IBoardSquareStateContext): BoardSquareState | false {
    return this.playerHasTile(context)
      ? BoardSquareStateType.AvailableForSelection()
      : false;
  }

  private playerHasTile(context: IBoardSquareStateContext): boolean {
    return (
      context.playerTurn.boardSquareSelectedState.type !== "Confirmed" &&
      context.playerTurn.boardSquareOptionIds.includes(context.index)
    );
  }
}
