import { GameConfig } from "../game-config";
import { HotelChainType, ISharesState } from "../model";
import { ActionLog } from "../model/action-log";
import { Hotel } from "../model/hotel";
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

const getOrphanedShares = (
  playerId: string,
  hotels: Hotel[],
  sharesState: ISharesState,
  currentTurn: ActionLog[]
): {
  playerId: string;
  remainingShares: number;
  hotel: Hotel;
} | null => {
  for (const hotel of hotels) {
    const totalShares = sharesState[playerId][hotel.type] ?? 0;

    const sharesKept = currentTurn.filter(
      (log) =>
        log.actionResult.type === "Share Kept" &&
        log.actionResult.action.playerId === playerId &&
        log.actionResult.action.hotelChain === hotel.type
    ).length;

    const remainingShares = totalShares - sharesKept;

    if (remainingShares > 0) {
      return { playerId, remainingShares, hotel };
    }
  }

  return null;
};

/**
 * Finds the next player with shares that they haven't kept for the given hotels
 */
const findNextOrphanedShares = (
  sharesState: ISharesState,
  startPlayerId: string,
  hotels: Hotel[],
  currentTurn: ActionLog[]
): {
  playerId: string;
  remainingShares: number;
  hotel: Hotel;
} | null => {
  const playerIds = Object.keys(sharesState);

  let playerId = startPlayerId;
  let orphanedShares = getOrphanedShares(
    playerId,
    hotels,
    sharesState,
    currentTurn
  );

  while (!orphanedShares) {
    playerId = PlayerUtils.getNextPlayerId(playerIds, playerId);
    orphanedShares = getOrphanedShares(
      playerId,
      hotels,
      sharesState,
      currentTurn
    );

    if (playerId === startPlayerId) {
      return null;
    }
  }

  return orphanedShares;
};

export const SharesUtils = {
  getSharesCost,
  findNextOrphanedShares,
};
