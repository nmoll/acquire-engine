import { GameConfig } from "../../game-config";
import { IGameState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { ICashState } from "../../model/cash-state";
import { PlayerActionResult } from "../../model/player-action-result";
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
  state: IGameState | null = null,
  actionResult: PlayerActionResult | null = null
): ICashState => {
  if (!state) {
    return fillEmptyStates(gameInstance.playerIds, {});
  }

  if (!actionResult) {
    return state.cashState;
  }

  switch (actionResult.type) {
    case "Shares Purchased":
      const { playerId, hotelChain } = actionResult.action;
      return {
        ...state.cashState,
        [playerId]:
          state.cashState[playerId] -
          SharesUtils.getSharesCost(
            hotelChain,
            HotelChainUtils.getHotelSize(hotelChain, state.boardState)
          ),
      };
    case "Hotel Auto Merged":
      return Object.entries(actionResult.cashAwarded).reduce(
        (state, [playerId, cashAwarded]) => ({
          ...state,
          [playerId]: state[playerId] + cashAwarded,
        }),
        state.cashState
      );
  }

  return state.cashState;
};

export const CashStateEngine = {
  computeState,
};
