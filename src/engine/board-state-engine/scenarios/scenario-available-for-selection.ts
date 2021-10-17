import { PlayerActionContext } from "../../../model/player-action-context";
import { IBoardStateScenario } from "./board-state-scenario";

export const ScenarioAvailableForSelection: IBoardStateScenario = (
  _context: PlayerActionContext
) => false;
