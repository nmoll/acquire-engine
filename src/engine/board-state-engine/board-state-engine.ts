import {
  BoardSquareState,
  BoardSquareStateType,
} from "../../model/board-square-state";
import { PlayerAction } from "../../model/player-action";
import { PlayerActionContext } from "../../model/player-action-context";
import { ScenarioAvailableForSelection } from "./scenarios/scenario-available-for-selection";
import { ScenarioHasHotelChain } from "./scenarios/scenario-has-hotel-chain";
import { ScenarioHasTile } from "./scenarios/scenario-has-tile";

const defaultState: BoardSquareState[] = [];
for (let i = 0; i < 108; i++) {
  defaultState.push(BoardSquareStateType.Default());
}

const getBoardSquareState = (context: PlayerActionContext): BoardSquareState =>
  new ScenarioHasHotelChain().resolve(context) ||
  new ScenarioHasTile().resolve(context) ||
  new ScenarioAvailableForSelection().resolve(context) ||
  context.boardState[context.index];

const computeState = (
  playerAction: PlayerAction | null = null,
  boardState: BoardSquareState[] = []
): BoardSquareState[] => {
  if (!boardState || !boardState.length) {
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
