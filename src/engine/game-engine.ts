import { IGameState, IPlayerTurn } from "../model";
import { BoardStateEngine } from "./board-state-engine";
import { SharesEngine } from "./shares-engine";

const initialState: IGameState = {
  boardState: BoardStateEngine.computeState([], null),
  sharesState: SharesEngine.computeState(null)
};

const computeGameState = (
  playerTurns: IPlayerTurn[],
  state: IGameState = initialState
): IGameState => {
  if (!playerTurns || playerTurns.length === 0) {
    return state;
  }

  return computeGameState(playerTurns.slice(1), {
    boardState: BoardStateEngine.computeState(state.boardState, playerTurns[0]),
    sharesState: SharesEngine.computeState(
      playerTurns[0],
      state.sharesState,
      state.boardState
    )
  });
};

export const GameEngine = {
  computeGameState
};
