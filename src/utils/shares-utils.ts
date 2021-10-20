import { GameConfig } from "../game-config";
import { HotelChainType, ISharesState } from "../model";
import { HotelChainPositions } from "../model/hotel-chain-positions";
import { IShares } from "../model/shares";

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
  hotelChains: HotelChainType[],
  sharesState: ISharesState
) =>
  hotelChains.reduce(
    (result, hotelChain) => ({
      ...result,
      [hotelChain]: Math.min(
        SharesUtils.getAvailableSharesForHotel(sharesState, hotelChain),
        GameConfig.turn.maxShares
      ),
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
  share: IShares,
  hotelPositions: HotelChainPositions
): number => {
  const hotelSize = hotelPositions[share.hotel]?.length;
  if (!hotelSize || hotelSize < 2) {
    // ensures a player can't buy this
    return 100000;
  }

  const basePriceByType = GameConfig.hotel.basePrice[share.hotel];
  const basePriceBySize = getBasePriceBySize(
    hotelPositions[share.hotel]?.length || 0
  );
  return (basePriceByType + basePriceBySize) * share.quantity;
};

const getTotalSharesCost = (
  shares: IShares[],
  hotelPositions: HotelChainPositions
): number =>
  shares.reduce(
    (total, share) => total + getSharesCost(share, hotelPositions),
    0
  );

export const SharesUtils = {
  getAvailableShares,
  getAvailableSharesForHotel,
  getAvailableSharesForPurchase,
  getSharesCost,
  getTotalSharesCost,
};
