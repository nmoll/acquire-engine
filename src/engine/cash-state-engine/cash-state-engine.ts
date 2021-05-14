import { HotelChainType } from "../../model";
import { ICashState } from "../../model/cash-state";
import { PlayerAction } from "../../model/player-action";
import { IShares } from "../../model/shares";

const startingAmount = 6000;

const fillEmptyStates = (
  playerIds: number[],
  cashState: ICashState
): ICashState =>
  playerIds.reduce(
    (state, playerId) => ({
      ...state,
      [playerId]:
        state[playerId] === undefined ? startingAmount : state[playerId],
    }),
    cashState
  );

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
  playerIds: number[],
  playerAction: PlayerAction | null = null,
  state: ICashState = {}
): ICashState => {
  state = fillEmptyStates(playerIds, state);

  if (!playerAction) {
    return state;
  }

  return {
    ...state,
    [playerAction.playerId]:
      state[playerAction.playerId] -
      getTotalSharesPrice(
        playerAction.type === "PurchaseShares" ? playerAction.shares : []
      ),
  };
};

export const CashStateEngine = {
  computeState,
};
