import { HotelChainType } from "../../model";
import { ICashState } from "../../model/cash-state";
import { PlayerAction } from "../../model/player-action";
import { IShares } from "../../model/shares";

const initialState: ICashState = {};

const startingAmount = 6000;

const getStockBasePrice = (hotel: HotelChainType): number => {
  let basePrice;
  switch (hotel) {
    case HotelChainType.WORLDWIDE:
    case HotelChainType.LUXOR:
      basePrice = 200;
      break;
    case HotelChainType.FESTIVAL:
    case HotelChainType.IMPERIAL:
    case HotelChainType.AMERICAN:
      basePrice = 300;
      break;
    case HotelChainType.CONTINENTAL:
    case HotelChainType.TOWER:
      basePrice = 400;
      break;
  }
  return basePrice;
};

const getTotalSharesPrice = (shares: IShares[]): number =>
  shares
    ? shares.reduce(
        (total, share) =>
          total + getStockBasePrice(share.hotel) * share.quantity,
        0
      )
    : 0;

const computeState = (
  playerAction: PlayerAction | null,
  state: ICashState = initialState
): ICashState => {
  if (!playerAction) {
    return state;
  }

  const playerCash = !isNaN(state[playerAction.playerId])
    ? state[playerAction.playerId]
    : startingAmount;
  const purchasedShares =
    playerAction.type === "PurchaseShares" ? playerAction.shares : [];

  return {
    ...state,
    [playerAction.playerId]: playerCash - getTotalSharesPrice(purchasedShares),
  };
};

export const CashEngine = {
  computeState,
};
