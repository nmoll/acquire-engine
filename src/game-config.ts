import { HotelChainType } from "./model";

export const GameConfig = {
  board: {
    size: 108,
  },
  cash: {
    startingAmount: 6000,
  },
  tile: {
    rackSize: 6,
  },
  turn: {
    maxShares: 3,
  },
  hotel: {
    shares: 25,
    starterBonus: 1,
    safeSize: 11,
    gameEndingSize: 41,
    basePrice: {
      Tower: 200,
      Luxor: 200,
      American: 300,
      Worldwide: 300,
      Festival: 300,
      Imperial: 400,
      Continental: 400,
    } as Record<HotelChainType, number>,
  },
};
