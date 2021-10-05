import {
  BoardSquareState,
  BoardSquareStateType,
} from "../../model/board-square-state";
import { PlayerAction } from "../../model/player-action";
import { PlayerActionContext } from "../../model/player-action-context";
import { ArrayUtils } from "../../utils/array-utils";
import { ScenarioAvailableForSelection } from "./scenarios/scenario-available-for-selection";
import { ScenarioHasHotelChain } from "./scenarios/scenario-has-hotel-chain";
import { ScenarioHasTile } from "./scenarios/scenario-has-tile";

const defaultState: BoardSquareState[] = ArrayUtils.makeNumArray(108).map(() =>
  BoardSquareStateType.Default()
);

const getBoardSquareState = (context: PlayerActionContext): BoardSquareState =>
  ScenarioHasHotelChain.resolve(context) ||
  ScenarioHasTile.resolve(context) ||
  ScenarioAvailableForSelection.resolve(context) ||
  context.boardState[context.index];

const computeState = (
  playerAction: PlayerAction | null = null,
  boardState: BoardSquareState[] = []
): BoardSquareState[] => {
  if (!boardState?.length) {
    return defaultState;
  }
  if (!playerAction) {
    return boardState;
  }

  return boardState.map((_, index) =>
    getBoardSquareState({
      boardState,
      playerAction,
      index,
    })
  );
};

export const BoardStateEngine = {
  computeState,
};