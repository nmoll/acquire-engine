import { IGameState } from "../model";
import { ActionLog } from "../model/action-log";
import { Hotel } from "../model/hotel";
import { Merge, PlaceTile } from "../model/player-action";
import { PlayerActionResult } from "../model/player-action-result";
import { TurnContext } from "../model/turn-context";
import { PlayerUtils } from "./player-utils";

const getCurrentTurn = (gameLog: ActionLog[]): ActionLog[] => {
  const turnStart =
    gameLog.map((result) => result.action.type).lastIndexOf("EndTurn") + 1;
  if (turnStart === 0) {
    return gameLog;
  }
  return gameLog.slice(turnStart);
};

const getPlayerIds = (
  gameLog: ActionLog[],
  currentAction: PlayerActionResult
): string[] => {
  const allPlayerIds = [
    ...gameLog.map((log) => log.action),
    currentAction.action,
  ].map((action) => action.playerId);
  return Array.from(new Set(allPlayerIds));
};

const getSharesResolvedThisTurn = (
  playerId: string,
  turnContext: TurnContext
) => {
  const actions = [
    ...turnContext.turnLog.map((log) => log.action),
    turnContext.actionResult.action,
  ];
  return actions.reduce((total, action) => {
    if (action.type === "KeepOrphanedShare" && action.playerId === playerId) {
      return total + 1;
    } else if (
      action.type === "SellOrphanedShare" &&
      action.playerId === playerId
    ) {
      return total + 1;
    } else if (
      action.type === "TradeOrphanedShare" &&
      action.playerId === playerId
    ) {
      return total + 2;
    }
    return total;
  }, 0);
};

const getNumOrphanedSharesToResolve = (
  playerId: string,
  turnContext: TurnContext
): number => {
  const mergeContext = turnContext.mergeContext;
  if (!mergeContext) {
    return 0;
  }

  const sharesResolved = getSharesResolvedThisTurn(playerId, turnContext);

  const sharesAtMerge =
    mergeContext.gameState.sharesState[playerId][mergeContext.minority.type] ??
    0;

  return sharesAtMerge - sharesResolved;
};

/**
 * Returns the context of a merge this turn, or null if no merge happened.
 */
const getMergeContextThisTurn = (
  gameLog: ActionLog[]
): {
  action: PlaceTile | Merge;
  gameState: IGameState;
  minority: Hotel;
  majority: Hotel;
} | null => {
  const currentTurn = getCurrentTurn(gameLog);

  for (let log of currentTurn) {
    const result = log.actionResult;
    if (result.type === "Hotel Merged") {
      return {
        action: result.action,
        gameState: log.state,
        minority: result.minority,
        majority: result.majority,
      };
    }
  }
  return null;
};

const findPlayerWithUnresolvedOrphanedShares = (
  turnContext: TurnContext
): {
  playerId: string;
  shares: number;
} | null => {
  const startPlayerId = turnContext.actionResult.action.playerId;
  let playerId = startPlayerId;
  let sharesToResolve = getNumOrphanedSharesToResolve(playerId, turnContext);

  while (sharesToResolve <= 0) {
    playerId = PlayerUtils.getNextPlayerId(turnContext.playerIds, playerId);
    sharesToResolve = getNumOrphanedSharesToResolve(playerId, turnContext);
    if (playerId === startPlayerId) {
      return null;
    }
  }

  return { playerId, shares: sharesToResolve };
};

export const ActionUtils = {
  getCurrentTurn,
  getPlayerIds,
  getMergeContextThisTurn,
  findPlayerWithUnresolvedOrphanedShares,
};
