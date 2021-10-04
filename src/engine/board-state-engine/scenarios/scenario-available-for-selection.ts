import { BoardSquareState } from "../../../model";
import { PlayerActionContext } from "../../../model/player-action-context";
import { IBoardStateScenario } from "./board-state-scenario";

export const ScenarioAvailableForSelection: IBoardStateScenario = {
  resolve: (_context: PlayerActionContext): BoardSquareState | false => false,
};
