import { IGameState } from "../../model";
import { PlayerAction } from "../../model/player-action";
import { BoardStateEngine } from "../board-state-engine/board-state-engine";
import { CashEngine } from "../cash-engine/cash-engine";
import { CurrentPlayerEngine } from "../current-player-engine/curent-player-engine";
import { SharesEngine } from "../shares-engine/shares-engine";

const initialState: IGameState = {
  boardState: BoardStateEngine.computeState(),
  cashState: CashEngine.computeState([]),
  sharesState: SharesEngine.computeState([]),
  currentPlayerId: null,
};

const computeGameState = (
  playerIds: number[],
  playerActions: PlayerAction[],
  state: IGameState = initialState
): IGameState => {
  if (!playerActions || playerActions.length === 0) {
    return state;
  }

  return computeGameState(playerIds, playerActions.slice(1), {
    boardState: BoardStateEngine.computeState(
      playerActions[0],
      state.boardState
    ),
    cashState: CashEngine.computeState(
      playerIds,
      playerActions[0],
      state.cashState
    ),
    sharesState: SharesEngine.computeState(
      playerIds,
      playerActions[0],
      state.sharesState
    ),
    currentPlayerId: CurrentPlayerEngine.computeState(
      playerIds,
      playerActions[0]
    ),
  });
};

export const GameEngine = {
  computeGameState,
};
