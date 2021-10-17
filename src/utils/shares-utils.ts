import { HotelChainType, ISharesState } from "../model";
import { IShares } from "../model/shares";

const MAX_HOTEL_SHARES = 25;
const MAX_PURCHASE_ON_TURN = 3;

const basePriceByHotel: Record<HotelChainType, number> = {
  WORLDWIDE: 200,
  LUXOR: 200,
  FESTIVAL: 300,
  IMPERIAL: 300,
  AMERICAN: 300,
  CONTINENTAL: 400,
  TOWER: 400,
};

const getAvailableSharesForHotel = (
  sharesState: ISharesState,
  hotelChain: HotelChainType
): number =>
  MAX_HOTEL_SHARES -
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
        MAX_PURCHASE_ON_TURN
      ),
    }),
    {}
  );

const getSharesCost = (share: IShares): number =>
  basePriceByHotel[share.hotel] * share.quantity;

const getTotalSharesCost = (shares: IShares[]): number =>
  shares.reduce((total, share) => total + getSharesCost(share), 0);

export const SharesUtils = {
  getAvailableShares,
  getAvailableSharesForHotel,
  getAvailableSharesForPurchase,
  getTotalSharesCost,
};
