import { IGameState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerAction } from "../../model/player-action";
import { BoardStateEngine } from "../board-state-engine/board-state-engine";
import { CashStateEngine } from "../cash-state-engine/cash-state-engine";
import { CurrentPlayerIdStateEngine } from "../current-player-id-state-engine/current-player-id-state-engine";
import { SharesStateEngine } from "../shares-state-engine/shares-state-engine";

const getInitialState = (gameInstance: IAcquireGameInstance): IGameState => ({
  boardState: BoardStateEngine.computeState(),
  cashState: CashStateEngine.computeState(gameInstance),
  sharesState: SharesStateEngine.computeState([]),
  currentPlayerIdState: CurrentPlayerIdStateEngine.computeState([]),
});

const computeGameState = (
  gameInstance: IAcquireGameInstance,
  playerActions: PlayerAction[],
  state: IGameState = getInitialState(gameInstance)
): IGameState => {
  if (!playerActions || playerActions.length === 0) {
    return state;
  }

  return computeGameState(gameInstance, playerActions.slice(1), {
    boardState: BoardStateEngine.computeState(
      playerActions[0],
      state.boardState
    ),
    cashState: CashStateEngine.computeState(
      gameInstance,
      playerActions[0],
      state.cashState
    ),
    sharesState: SharesStateEngine.computeState(
      gameInstance.playerIds,
      playerActions[0],
      state.sharesState
    ),
    currentPlayerIdState: CurrentPlayerIdStateEngine.computeState(
      gameInstance.playerIds,
      playerActions[0]
    ),
  });
};

export const GameStateEngine = {
  computeGameState,
};
