import { IGameState } from "../../model";
import { PlayerAction } from "../../model/player-action";
import { BoardStateEngine } from "../board-state-engine/board-state-engine";
import { CashStateEngine } from "../cash-state-engine/cash-state-engine";
import { CurrentPlayerIdStateEngine } from "../current-player-id-state-engine/current-player-id-state-engine";
import { SharesStateEngine } from "../shares-state-engine/shares-state-engine";

const initialState: IGameState = {
  boardState: BoardStateEngine.computeState(),
  cashState: CashStateEngine.computeState([]),
  sharesState: SharesStateEngine.computeState([]),
  currentPlayerIdState: CurrentPlayerIdStateEngine.computeState([]),
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
    cashState: CashStateEngine.computeState(
      playerIds,
      playerActions[0],
      state.cashState
    ),
    sharesState: SharesStateEngine.computeState(
      playerIds,
      playerActions[0],
      state.sharesState
    ),
    currentPlayerIdState: CurrentPlayerIdStateEngine.computeState(
      playerIds,
      playerActions[0]
    ),
  });
};

export const GameStateEngine = {
  computeGameState,
};
