import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { CurrentPlayerIdState } from "../../model/current-player-id-state";
import { PlayerAction } from "../../model/player-action";

const getPlayerIdx = (playerIds: number[], playerId: number) =>
  playerIds.findIndex((id) => id === playerId);

const isLastPlayer = (playerIds: number[], playerId: number) =>
  getPlayerIdx(playerIds, playerId) === playerIds.length - 1;

const getNextPlayerId = (playerIds: number[], playerId: number) =>
  isLastPlayer(playerIds, playerId)
    ? playerIds[0]
    : playerIds[getPlayerIdx(playerIds, playerId) + 1];

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
    ? getNextPlayerId(gameInstance.playerIds, playerAction.playerId)
    : playerAction.playerId;
};

export const CurrentPlayerIdStateEngine = {
  computeState,
};
