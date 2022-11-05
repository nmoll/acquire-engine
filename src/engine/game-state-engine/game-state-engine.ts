import { IGameState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerAction } from "../../model/player-action";
import { ActionResultEngine } from "../action-result-engine/action-result-engine";
import { AvailableActionsStateEngine } from "../available-actions-state-engine/available-actions-state-engine";
import { BoardStateEngine } from "../board-state-engine/board-state-engine";
import { CashStateEngine } from "../cash-state-engine/cash-state-engine";
import { CurrentPlayerIdStateEngine } from "../current-player-id-state-engine/current-player-id-state-engine";
import { SharesStateEngine } from "../shares-state-engine/shares-state-engine";
import { TileStateEngine } from "../tile-state-engine/tile-state-engine";

const getInitialState = (gameInstance: IAcquireGameInstance): IGameState => {
  const boardState = BoardStateEngine.computeState();
  const cashState = CashStateEngine.computeState(gameInstance);
  const tileState = TileStateEngine.computeState(gameInstance);
  const sharesState = SharesStateEngine.computeState(gameInstance);
  const currentPlayerIdState =
    CurrentPlayerIdStateEngine.computeState(gameInstance);
  const availableActionsState = AvailableActionsStateEngine.computeState(
    boardState,
    sharesState,
    cashState
  );

  return {
    boardState,
    cashState,
    tileState,
    sharesState,
    currentPlayerIdState,
    availableActionsState,
  };
};

const computeGameState = (
  gameInstance: IAcquireGameInstance,
  playerActions: PlayerAction[],
  state: IGameState = getInitialState(gameInstance),
  history: PlayerAction[] = []
): IGameState => {
  if (!playerActions || playerActions.length === 0) {
    return state;
  }

  if (!AvailableActionsStateEngine.validateAction(playerActions[0], state)) {
    // Throw out the action and resume
    return computeGameState(
      gameInstance,
      playerActions.slice(1),
      state,
      history
    );
  }

  const actionResult = ActionResultEngine.computeActionResult(
    state,
    playerActions[0]
  );

  const boardState = BoardStateEngine.computeState(
    actionResult,
    state.boardState
  );

  const cashState = CashStateEngine.computeState(
    gameInstance,
    state,
    actionResult
  );

  const tileState = TileStateEngine.computeState(
    gameInstance,
    actionResult,
    state.tileState
  );

  const sharesState = SharesStateEngine.computeState(
    gameInstance,
    actionResult,
    state.sharesState
  );

  const currentPlayerIdState = CurrentPlayerIdStateEngine.computeState(
    gameInstance,
    actionResult
  );

  const availableActionsState = AvailableActionsStateEngine.computeState(
    boardState,
    sharesState,
    cashState,
    actionResult,
    history
  );

  return computeGameState(
    gameInstance,
    playerActions.slice(1),
    {
      boardState,
      cashState,
      tileState,
      sharesState,
      currentPlayerIdState,
      availableActionsState,
    },
    [...history, playerActions[0]]
  );
};

export const GameStateEngine = {
  computeGameState,
};
