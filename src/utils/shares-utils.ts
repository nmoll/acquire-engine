import { GameConfig } from "../game-config";
import { HotelChainType, ISharesState } from "../model";
import { ActionLog } from "../model/action-log";
import { PlayerUtils } from "./player-utils";

const getBasePriceBySize = (size: number): number => {
  if (size < 2) {
    // ensures a player can't buy this
    return 100000;
  }
  const priceLatter: Record<string, number> = {
    2: 0,
    3: 100,
    4: 200,
    5: 300,
    10: 400,
    20: 500,
    30: 600,
    40: 700,
    1000: 800,
  };

  const step = Object.keys(priceLatter).find(
    (threshold) => size <= Number(threshold)
  );
  return step ? priceLatter[step] : 0;
};

const getSharesCost = (
  hotelChain: HotelChainType,
  hotelSize: number
): number => {
  if (hotelSize < 2) {
    // ensures a player can't buy this
    return 100000;
  }

  return GameConfig.hotel.basePrice[hotelChain] + getBasePriceBySize(hotelSize);
};

const getNumSharesKept = (currentTurn: ActionLog[], playerId: string) =>
  currentTurn.filter(
    (log) =>
      log.actionResult.type === "Share Kept" &&
      log.actionResult.action.playerId === playerId
  ).length;

const getNextPlayerWithOrphanedShares = (
  sharesState: ISharesState,
  startPlayerId: string,
  hotelChain: HotelChainType,
  currentTurn: ActionLog[]
): {
  playerId: string;
  remainingShares: number;
} | null => {
  const playerIds = Object.keys(sharesState);

  let playerId = startPlayerId;
  let remainingShares =
    (sharesState[playerId][hotelChain] ?? 0) -
    getNumSharesKept(currentTurn, playerId);

  while (remainingShares <= 0) {
    playerId = PlayerUtils.getNextPlayerId(playerIds, playerId);
    remainingShares =
      (sharesState[playerId][hotelChain] ?? 0) -
      getNumSharesKept(currentTurn, playerId);

    if (playerId === startPlayerId) {
      return null;
    }
  }

  return { playerId, remainingShares };
};

export const SharesUtils = {
  getSharesCost,
  getNextPlayerWithOrphanedShares,
};
