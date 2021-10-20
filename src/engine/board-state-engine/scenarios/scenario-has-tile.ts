import { BoardSquareStateType } from "../../../model";
import { PlayerActionContext } from "../../../model/player-action-context";

export const ScenarioHasTile = (context: PlayerActionContext) =>
  context.playerAction.type === "PlaceTile" &&
  context.playerAction.boardSquareId === context.index
    ? BoardSquareStateType.HasTile()
    : false;
