import {
  BoardSquareState,
  BoardSquareStateType,
} from "../../model/board-square-state";
import { IBoardSquareStateContext } from "../../model/board-square-state-context";
import { PlayerAction } from "../../model/player-action";
import { IPlayerTurn } from "../../model/player-turn";
import { ScenarioAvailableForSelection } from "./scenarios/scenario-available-for-selection";
import { ScenarioHasHotelChain } from "./scenarios/scenario-has-hotel-chain";
import { ScenarioHasTile } from "./scenarios/scenario-has-tile";
import { ScenarioIsPendingHotel } from "./scenarios/scenario-is-pending-hotel";
import { ScenarioIsSelected } from "./scenarios/scenario-is-selected";

const defaultState: BoardSquareState[] = [];
for (let i = 0; i < 108; i++) {
  defaultState.push(BoardSquareStateType.None());
}

const getBoardSquareState = (
  context: IBoardSquareStateContext
): BoardSquareState =>
  new ScenarioHasHotelChain().resolve(context) ||
  new ScenarioIsPendingHotel().resolve(context) ||
  new ScenarioHasTile().resolve(context) ||
  new ScenarioIsSelected().resolve(context) ||
  new ScenarioAvailableForSelection().resolve(context) ||
  context.boardState[context.index];

const computeState = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn | null
): BoardSquareState[] =>
  boardState && boardState.length && playerTurn
    ? boardState.map((_, index) =>
        getBoardSquareState({
          type: "turn",
          boardState,
          playerTurn,
          index,
        })
      )
    : defaultState;

const computeStateWithAction = (
  boardState: BoardSquareState[],
  playerAction: PlayerAction | null
): BoardSquareState[] => {
  if (!boardState || !boardState.length) {
    return defaultState;
  }
  if (!playerAction) {
    return boardState;
  }
  return boardState.map((_, index) =>
    getBoardSquareState({
      type: "action",
      boardState,
      playerAction,
      index,
    })
  );
};

export const BoardStateEngine = {
  computeState,
  computeStateWithAction,
};
