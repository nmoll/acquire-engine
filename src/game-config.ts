import { HotelChainType } from "./model";

export const GameConfig = {
  board: {
    size: 108,
  },
  cash: {
    startingAmount: 6000,
  },
  tile: {
    rackSize: 5,
  },
  turn: {
    maxShares: 3,
  },
  hotel: {
    shares: 25,
    starterBonus: 1,
    basePrice: {
      WORLDWIDE: 200,
      LUXOR: 200,
      FESTIVAL: 300,
      IMPERIAL: 300,
      AMERICAN: 300,
      CONTINENTAL: 400,
      TOWER: 400,
    } as Record<HotelChainType, number>,
  },
};
