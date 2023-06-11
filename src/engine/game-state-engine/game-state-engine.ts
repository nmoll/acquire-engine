import { IGameState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { ActionLog } from "../../model/action-log";
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
  playerActions: PlayerAction[]
): IGameState => {
  const gameLog: ActionLog[] = [];

  return playerActions.reduce<IGameState>((state, action) => {
    if (!AvailableActionsStateEngine.validateAction(action, state)) {
      return state;
    }

    const actionResult = ActionResultEngine.computeActionResult(state, action);

    const boardState = BoardStateEngine.computeState(
      actionResult,
      state.boardState
    );

    const cashState = CashStateEngine.computeState(
      gameInstance,
      state,
      actionResult,
      gameLog
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
      actionResult,
      sharesState,
      gameLog
    );

    const availableActionsState = AvailableActionsStateEngine.computeState(
      boardState,
      sharesState,
      cashState,
      actionResult,
      gameLog
    );

    const newState = {
      boardState,
      cashState,
      sharesState,
      tileState,
      availableActionsState,
      currentPlayerIdState,
    };

    gameLog.push({
      action,
      actionResult,
      state: newState,
    });

    return newState;
  }, getInitialState(gameInstance));
};

export const GameStateEngine = {
  computeGameState,
};
