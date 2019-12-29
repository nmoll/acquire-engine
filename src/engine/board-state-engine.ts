import {
  BoardSquareState,
  BoardSquareStateType
} from "../model/board-square-state";
import { IPlayerTurn } from "../model/player-turn";
import { Scenarios } from "./scenarios";

const defaultState = [];
for (let i = 0; i < 108; i++) {
  defaultState.push(BoardSquareStateType.None());
}

const getBoardSquareState = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn,
  index: number
): BoardSquareState =>
  Scenarios.getHasHotelChainState(boardState, playerTurn, index) ||
  Scenarios.getPendingHotelState(boardState, playerTurn, index) ||
  Scenarios.getSelectedState(boardState, playerTurn, index) ||
  Scenarios.getAvailableForSelectionState(boardState, playerTurn, index) ||
  Scenarios.getHasTileState(boardState, playerTurn, index) ||
  Scenarios.getCurrentState(boardState, playerTurn, index);

const computeState = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn
): BoardSquareState[] =>
  boardState && boardState.length && playerTurn
    ? boardState.map((_, index) =>
        getBoardSquareState(boardState, playerTurn, index)
      )
    : defaultState;

export const BoardStateEngine = {
  computeState
};
