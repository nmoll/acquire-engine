const assignId = (name: string): string =>
  `${1000 + Math.round(Math.random() * 8999)}_${name}`;

const getDisplayName = (id: string | undefined): string =>
  id?.split("_").slice(1).join("_") ?? "Unknown";

const getPlayerIdx = (playerIds: string[], playerId: string) =>
  playerIds.findIndex((id) => id === playerId);

const isLastPlayer = (playerIds: string[], playerId: string) =>
  getPlayerIdx(playerIds, playerId) === playerIds.length - 1;

const getNextPlayerId = (playerIds: string[], playerId: string) =>
  isLastPlayer(playerIds, playerId)
    ? playerIds[0]
    : playerIds[getPlayerIdx(playerIds, playerId) + 1];

export const PlayerUtils = {
  assignId,
  getDisplayName,
  getNextPlayerId,
};
