import { IGameState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { ActionLog } from "../../model/action-log";
import { ICashState } from "../../model/cash-state";
import { PlayerAction } from "../../model/player-action";
import { TurnContext } from "../../model/turn-context";
import { ActionUtils } from "../../utils/action-utils";
import { ActionResultEngine } from "../action-result-engine/action-result-engine";
import { AvailableActionsStateEngine } from "../available-actions-state-engine/available-actions-state-engine";
import { BoardStateEngine } from "../board-state-engine/board-state-engine";
import { CashStateEngine } from "../cash-state-engine/cash-state-engine";
import { CurrentPlayerIdStateEngine } from "../current-player-id-state-engine/current-player-id-state-engine";
import { SharesStateEngine } from "../shares-state-engine/shares-state-engine";
import { TileStateEngine } from "../tile-state-engine/tile-state-engine";

const getInitialState = (gameInstance: IAcquireGameInstance): IGameState => {
  const boardState = BoardStateEngine.getInitialState();
  const cashState = CashStateEngine.getInitialState(gameInstance.playerIds);
  const tileState = TileStateEngine.getInitialState(gameInstance);
  const sharesState = SharesStateEngine.getInitialState(gameInstance.playerIds);
  const currentPlayerIdState = CurrentPlayerIdStateEngine.getInitialState(
    gameInstance.playerIds
  );
  const availableActionsState = AvailableActionsStateEngine.getInitialState(
    currentPlayerIdState,
    tileState
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

    const turnContext: TurnContext = {
      playerIds: gameInstance.playerIds,
      mergeContext: ActionUtils.getMergeContextThisTurn(gameLog),
      actionResult,
      turnLog: ActionUtils.getCurrentTurn(gameLog),
    };

    const boardState = BoardStateEngine.computeState(
      actionResult,
      state.boardState
    );

    const cashState = CashStateEngine.computeState(state, turnContext);

    const tileState = TileStateEngine.computeState(
      gameInstance,
      actionResult,
      state.tileState,
      boardState,
      gameLog
    );

    const sharesState = SharesStateEngine.computeState(
      actionResult,
      state.sharesState
    );

    const currentPlayerIdState = CurrentPlayerIdStateEngine.computeState(
      gameInstance,
      actionResult,
      sharesState,
      turnContext
    );

    const availableActionsState = AvailableActionsStateEngine.computeState(
      boardState,
      sharesState,
      cashState,
      tileState,
      turnContext,
      currentPlayerIdState
    );

    let winners;
    if (actionResult.type === "Game Ended") {
      winners = getWinners(cashState);
    }

    const newState = {
      boardState,
      cashState,
      sharesState,
      tileState,
      availableActionsState,
      currentPlayerIdState,
      winners,
    };

    gameLog.push({
      action,
      actionResult,
      state: newState,
    });

    return newState;
  }, getInitialState(gameInstance));
};

const getWinners = (cashState: ICashState): string[] => {
  const maxCash = Math.max(...Object.values(cashState));
  return Object.entries(cashState)
    .filter(([, cash]) => cash === maxCash)
    .map(([playerId]) => playerId);
};

export const GameStateEngine = {
  computeGameState,
};
