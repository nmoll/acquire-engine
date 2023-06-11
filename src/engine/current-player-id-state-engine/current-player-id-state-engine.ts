import { ISharesState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { ActionLog } from "../../model/action-log";
import { CurrentPlayerIdState } from "../../model/current-player-id-state";
import { PlayerActionResult } from "../../model/player-action-result";
import { ActionUtils } from "../../utils/action-utils";
import { PlayerUtils } from "../../utils/player-utils";
import { SharesUtils } from "../../utils/shares-utils";

const computeState = (
  gameInstance: IAcquireGameInstance,
  result: PlayerActionResult | null = null,
  sharesState: ISharesState = {},
  gameLog: ActionLog[] = []
): CurrentPlayerIdState => {
  if (!gameInstance.playerIds.length) {
    return null;
  }
  if (!result) {
    return gameInstance.playerIds[0];
  }

  switch (result.type) {
    case "Share Kept":
    case "Share Traded":
    case "Share Sold":
      const playerWithUnresolvedShares =
        ActionUtils.findPlayerWithUnresolvedOrphanedShares(result, gameLog);

      if (playerWithUnresolvedShares) {
        return playerWithUnresolvedShares.playerId;
      } else {
        const mergeContext = ActionUtils.getMergeContextThisTurn(gameLog);
        if (mergeContext) {
          return mergeContext.action.playerId;
        }
      }
      break;

    case "Hotel Auto Merged":
      const playerWithShares = SharesUtils.getNextPlayerWithOrphanedShares(
        sharesState,
        result.action.playerId,
        result.minority.hotelChain,
        []
      );
      if (playerWithShares) {
        return playerWithShares.playerId;
      }
      break;
    case "Turn Ended":
      return PlayerUtils.getNextPlayerId(
        gameInstance.playerIds,
        result.action.playerId
      );
  }

  return result.action.playerId;
};

export const CurrentPlayerIdStateEngine = {
  computeState,
};
