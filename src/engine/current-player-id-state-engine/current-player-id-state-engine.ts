import { ISharesState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { CurrentPlayerIdState } from "../../model/current-player-id-state";
import { PlayerActionResult } from "../../model/player-action-result";
import { TurnContext } from "../../model/turn-context";
import { ActionUtils } from "../../utils/action-utils";
import { PlayerUtils } from "../../utils/player-utils";
import { SharesUtils } from "../../utils/shares-utils";

const getInitialState = (playerIds: string[]) => playerIds[0] ?? null;

const computeState = (
  gameInstance: IAcquireGameInstance,
  result: PlayerActionResult | null = null,
  sharesState: ISharesState = {},
  turnContext: TurnContext
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
        ActionUtils.findPlayerWithUnresolvedOrphanedShares(turnContext);

      if (playerWithUnresolvedShares) {
        return playerWithUnresolvedShares.playerId;
      } else {
        const mergeContext = turnContext.mergeContext;
        if (mergeContext) {
          return mergeContext.action.playerId;
        }
      }
      break;

    case "Hotel Merged":
      const playerWithShares = SharesUtils.findNextOrphanedShares(
        sharesState,
        result.action.playerId,
        result.dissolved,
        turnContext.turnLog
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
  getInitialState,
  computeState,
};
