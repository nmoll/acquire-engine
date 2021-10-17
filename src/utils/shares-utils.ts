import { GameConfig } from "../game-config";
import { HotelChainType, ISharesState } from "../model";
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

const getSharesCost = (share: IShares): number =>
  GameConfig.hotel.basePrice[share.hotel] * share.quantity;

const getTotalSharesCost = (shares: IShares[]): number =>
  shares.reduce((total, share) => total + getSharesCost(share), 0);

export const SharesUtils = {
  getAvailableShares,
  getAvailableSharesForHotel,
  getAvailableSharesForPurchase,
  getTotalSharesCost,
};
