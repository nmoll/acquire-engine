import { IGameState } from "../../model";
import { PlayerAction } from "../../model/player-action";
import { BoardStateEngine } from "../board-state-engine/board-state-engine";
import { CashEngine } from "../cash-engine/cash-engine";
import { SharesEngine } from "../shares-engine/shares-engine";

const initialState: IGameState = {
  boardState: BoardStateEngine.computeState([], null),
  cashState: CashEngine.computeState(null),
  sharesState: SharesEngine.computeState(null),
};

const computeGameState = (
  playerActions: PlayerAction[],
  state: IGameState = initialState
): IGameState => {
  if (!playerActions || playerActions.length === 0) {
    return state;
  }

  return computeGameState(playerActions.slice(1), {
    boardState: BoardStateEngine.computeState(
      state.boardState,
      playerActions[0]
    ),
    cashState: CashEngine.computeState(playerActions[0], state.cashState),
    sharesState: SharesEngine.computeState(playerActions[0], state.sharesState),
  });
};

export const GameEngine = {
  computeGameState,
};
