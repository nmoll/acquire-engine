import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { CurrentPlayerIdState } from "../../model/current-player-id-state";
import { PlayerActionResult } from "../../model/player-action-result";
import { PlayerUtils } from "../../utils/player-utils";

const computeState = (
  gameInstance: IAcquireGameInstance,
  result: PlayerActionResult | null = null
): CurrentPlayerIdState => {
  if (!gameInstance.playerIds.length) {
    return null;
  }
  if (!result) {
    return gameInstance.playerIds[0];
  }

  return result.type === "Turn Ended"
    ? PlayerUtils.getNextPlayerId(
        gameInstance.playerIds,
        result.action.playerId
      )
    : result.action.playerId;
};

export const CurrentPlayerIdStateEngine = {
  computeState,
};
