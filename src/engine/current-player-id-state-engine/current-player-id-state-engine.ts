import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { CurrentPlayerIdState } from "../../model/current-player-id-state";
import { PlayerAction } from "../../model/player-action";
import { PlayerUtils } from "../../utils/player-utils";

const computeState = (
  gameInstance: IAcquireGameInstance,
  playerAction: PlayerAction | null = null
): CurrentPlayerIdState => {
  if (!gameInstance.playerIds.length) {
    return null;
  }
  if (!playerAction) {
    return gameInstance.playerIds[0];
  }

  return playerAction.type === "EndTurn"
    ? PlayerUtils.getNextPlayerId(gameInstance.playerIds, playerAction.playerId)
    : playerAction.playerId;
};

export const CurrentPlayerIdStateEngine = {
  computeState,
};
