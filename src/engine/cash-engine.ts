import { HotelChainType, IPlayerTurn } from "../model";
import { ICashState } from "../model/cash-state";
import { IShares } from "../model/shares";

const initialState: ICashState = {};

const startingAmount = 6000;

const getStockPrice = (hotel: HotelChainType): number => {
  let basePrice;
  switch (hotel) {
    case HotelChainType.WORLDWIDE:
    case HotelChainType.LUXOR:
      basePrice = 0;
      break;
    case HotelChainType.FESTIVAL:
    case HotelChainType.IMPERIAL:
    case HotelChainType.AMERICAN:
      basePrice = 100;
      break;
    case HotelChainType.CONTINENTAL:
    case HotelChainType.TOWER:
      basePrice = 200;
      break;
  }
  return basePrice + 200;
};

const getTotalSharesPrice = (shares: IShares[]): number =>
  shares
    ? shares.reduce(
        (total, share) => total + getStockPrice(share.hotel) * share.quantity,
        0
      )
    : 0;

const computeState = (
  playerTurn: IPlayerTurn,
  state: ICashState = initialState
): ICashState => {
  if (!playerTurn) {
    return state;
  }

  return {
    ...state,
    [playerTurn.playerId]:
      (!isNaN(state[playerTurn.playerId])
        ? state[playerTurn.playerId]
        : startingAmount) -
      getTotalSharesPrice(playerTurn.sharesPurchased) +
      getTotalSharesPrice(playerTurn.sharesSold)
  };
};

export const CashEngine = {
  computeState
};
