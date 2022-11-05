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

  const playerAction = actionResult.action;

  if (playerAction.type === "PurchaseShares") {
    return {
      ...state.cashState,
      [playerAction.playerId]:
        state.cashState[playerAction.playerId] -
        SharesUtils.getSharesCost(
          playerAction.hotelChain,
          HotelChainUtils.getHotelSize(
            playerAction.hotelChain,
            state.boardState
          )
        ),
    };
  }

  return state.cashState;
};

export const CashStateEngine = {
  computeState,
};
