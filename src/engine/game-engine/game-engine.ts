import { IGameState, IPlayerTurn } from "../../model";
import { BoardStateEngine } from "../board-state-engine/board-state-engine";
import { CashEngine } from "../cash-engine/cash-engine";
import { SharesEngine } from "../shares-engine/shares-engine";

const initialState: IGameState = {
  boardState: BoardStateEngine.computeState([], null),
  cashState: CashEngine.computeState(null),
  sharesState: SharesEngine.computeState(null),
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
    cashState: CashEngine.computeState(playerTurns[0], state.cashState),
    sharesState: SharesEngine.computeState(
      playerTurns[0],
      state.sharesState,
      state.boardState
    ),
  });
};

export const GameEngine = {
  computeGameState,
};
