import { GameConfig } from "../game-config";
import { HotelChainType, ISharesState } from "../model";
import { AvailableShares } from "../model/available-shares.type";
import { HotelChainState } from "../model/hotel-chain-state";

const getAvailableSharesForHotel = (
  sharesState: ISharesState,
  hotelChain: HotelChainType
): number =>
  GameConfig.hotel.shares -
  Object.values(sharesState).reduce(
    (total, shares) => total + (shares[hotelChain] ?? 0),
    0
  );

const getAvailableShares = (
  sharesState: ISharesState,
  hotelChains: HotelChainType[]
): Partial<Record<HotelChainType, number>> =>
  hotelChains.reduce(
    (result, hotelChain) => ({
      ...result,
      [hotelChain]: getAvailableSharesForHotel(sharesState, hotelChain),
    }),
    {}
  );

const getAvailableSharesForPurchase = (
  hotelChainState: HotelChainState,
  playerCash: number
): AvailableShares =>
  Object.entries(hotelChainState).reduce<AvailableShares>(
    (result, [hotelChain, state]) => ({
      ...result,
      [hotelChain]:
        state.availableShares > 0 &&
        getSharesCost(
          hotelChain as HotelChainType,
          state.boardSquareIds.length
        ) <= playerCash,
    }),
    {}
  );

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

const getMajorityBonus = (
  hotelChain: HotelChainType,
  hotelSize: number
): number => getSharesCost(hotelChain, hotelSize) * 10;

const getMinorityBonus = (
  hotelChain: HotelChainType,
  hotelSize: number
): number => getMajorityBonus(hotelChain, hotelSize) / 2;

const getMajorityAndMinorityShareholders = (
  sharesState: ISharesState,
  hotelChain: HotelChainType
): {
  majorityShareholders: string[];
  minorityShareholders: string[];
} => {
  const playersWithShares = Object.entries(sharesState)
    .filter(([, shares]) => !!shares[hotelChain])
    .map(([playerId, shares]) => ({
      playerId,
      numShares: shares[hotelChain] ?? 0,
    }));

  if (playersWithShares.length === 1) {
    return {
      majorityShareholders: [playersWithShares[0].playerId],
      minorityShareholders: [playersWithShares[0].playerId],
    };
  }

  const majorityShareAmount = Math.max(
    ...playersWithShares.map((p) => p.numShares)
  );
  const majorityShareholders = playersWithShares
    .filter((p) => p.numShares === majorityShareAmount)
    .map((p) => p.playerId);

  if (majorityShareholders.length > 1) {
    return {
      majorityShareholders,
      minorityShareholders: majorityShareholders,
    };
  }

  const minorityShareAmount = Math.max(
    ...playersWithShares
      .filter((p) => p.numShares !== majorityShareAmount)
      .map((p) => p.numShares)
  );
  const minorityShareholders = playersWithShares
    .filter((p) => p.numShares === minorityShareAmount)
    .map((p) => p.playerId);

  return {
    majorityShareholders,
    minorityShareholders,
  };
};

export const SharesUtils = {
  getAvailableShares,
  getAvailableSharesForHotel,
  getAvailableSharesForPurchase,
  getSharesCost,
  getMajorityBonus,
  getMinorityBonus,
  getMajorityAndMinorityShareholders,
};
