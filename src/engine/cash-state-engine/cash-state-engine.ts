import { HotelChainType } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
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

const basePriceByHotel: Record<HotelChainType, number> = {
  WORLDWIDE: 200,
  LUXOR: 200,
  FESTIVAL: 300,
  IMPERIAL: 300,
  AMERICAN: 300,
  CONTINENTAL: 400,
  TOWER: 400,
};

const getTotalSharesPrice = (shares: IShares[]): number =>
  shares.reduce(
    (total, share) => total + basePriceByHotel[share.hotel] * share.quantity,
    0
  );

const computeState = (
  gameInstance: IAcquireGameInstance,
  playerAction: PlayerAction | null = null,
  state: ICashState = {}
): ICashState => {
  state = fillEmptyStates(gameInstance.playerIds, state);

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
