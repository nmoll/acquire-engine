import { HotelChainType, IGameState } from "../model";
import { ActionLog } from "../model/action-log";
import { PlaceTile } from "../model/player-action";
import { PlayerActionResult } from "../model/player-action-result";
import { PlayerUtils } from "./player-utils";

const getCurrentTurn = (gameLog: ActionLog[]): ActionLog[] => {
  const turnStart =
    gameLog.map((result) => result.action.type).lastIndexOf("EndTurn") + 1;
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
  history: ActionLog[],
  currentAction: PlayerActionResult,
  playerId: string
) => {
  const actions = [
    ...getCurrentTurn(history).map((log) => log.action),
    currentAction.action,
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
  history: ActionLog[],
  currentAction: PlayerActionResult,
  playerId: string
): number => {
  const mergeContext = getMergeContextThisTurn(history);
  if (!mergeContext) {
    return 0;
  }

  const sharesResolved = getSharesResolvedThisTurn(
    history,
    currentAction,
    playerId
  );

  const sharesAtMerge =
    mergeContext.gameState.sharesState[playerId][
      mergeContext.minority.hotelChain
    ] ?? 0;

  return sharesAtMerge - sharesResolved;
};

/**
 * Returns the context of a merge this turn, or null if no merge happened.
 */
const getMergeContextThisTurn = (
  gameLog: ActionLog[]
): {
  action: PlaceTile;
  gameState: IGameState;
  minority: {
    hotelChain: HotelChainType;
    size: number;
  };
  majority: {
    hotelChain: HotelChainType;
    size: number;
  };
} | null => {
  const currentTurn = getCurrentTurn(gameLog);

  for (let log of currentTurn) {
    const result = log.actionResult;
    if (result.type === "Hotel Auto Merged") {
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
  currentAction: PlayerActionResult,
  gameLog: ActionLog[]
): {
  playerId: string;
  shares: number;
} | null => {
  const playerIds = getPlayerIds(gameLog, currentAction);
  if (!playerIds.length) {
    return null;
  }

  let playerId = currentAction.action.playerId;
  let sharesToResolve = getNumOrphanedSharesToResolve(
    gameLog,
    currentAction,
    playerId
  );

  while (sharesToResolve <= 0) {
    playerId = PlayerUtils.getNextPlayerId(playerIds, playerId);
    sharesToResolve = getNumOrphanedSharesToResolve(
      gameLog,
      currentAction,
      playerId
    );
    if (playerId === currentAction.action.playerId) {
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
