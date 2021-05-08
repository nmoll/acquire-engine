import { BoardSquareState, BoardSquareStateType } from "../../../model";
import { PlayerActionContext } from "../../../model/player-action-context";
import { IBoardStateScenario } from "./board-state-scenario";

export class ScenarioHasTile implements IBoardStateScenario {
  resolve(context: PlayerActionContext): BoardSquareState | false {
    return context.playerAction.type === "PlaceTile" &&
      context.playerAction.boardSquareId === context.index
      ? BoardSquareStateType.HasTile()
      : false;
  }
}
