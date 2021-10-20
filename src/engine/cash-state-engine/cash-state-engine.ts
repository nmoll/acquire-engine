import { GameConfig } from "../../game-config";
import { BoardSquareState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { ICashState } from "../../model/cash-state";
import { PlayerAction } from "../../model/player-action";
import { HotelChainUtils } from "../../utils/hotel-chain-utils";
import { SharesUtils } from "../../utils/shares-utils";

const fillEmptyStates = (
  playerIds: string[],
  cashState: ICashState
): ICashState =>
  playerIds.reduce(
    (state, playerId) => ({
      ...state,
      [playerId]:
        state[playerId] === undefined
          ? GameConfig.cash.startingAmount
          : state[playerId],
    }),
    cashState
  );

const computeState = (
  gameInstance: IAcquireGameInstance,
  playerAction: PlayerAction | null = null,
  state: ICashState = {},
  boardState: BoardSquareState[] = []
): ICashState => {
  state = fillEmptyStates(gameInstance.playerIds, state);

  if (!playerAction) {
    return state;
  }

  const purchasedShares =
    playerAction.type === "PurchaseShares" ? playerAction.shares : [];

  const hotelPositions = HotelChainUtils.getHotelChainPositions(boardState);

  return {
    ...state,
    [playerAction.playerId]:
      state[playerAction.playerId] -
      SharesUtils.getTotalSharesCost(purchasedShares, hotelPositions),
  };
};

export const CashStateEngine = {
  computeState,
};
