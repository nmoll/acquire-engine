import { HotelChainType, ISharesState } from "../model";

const MAX_HOTEL_SHARES = 25;

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

export const SharesUtils = {
  getAvailableShares,
  getAvailableSharesForHotel,
};
