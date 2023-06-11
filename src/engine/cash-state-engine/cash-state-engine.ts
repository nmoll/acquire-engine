import { GameConfig } from "../../game-config";
import { BoardSquareState, HotelChainType, IGameState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { ActionLog } from "../../model/action-log";
import { ICashState } from "../../model/cash-state";
import { PlayerActionResult } from "../../model/player-action-result";
import { ActionUtils } from "../../utils/action-utils";
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

const getSharesCost = (
  hotelChain: HotelChainType,
  boardState: BoardSquareState[]
) =>
  SharesUtils.getSharesCost(
    hotelChain,
    HotelChainUtils.getHotelSize(hotelChain, boardState)
  );

const getSharesCostOfHotelBeforeMerge = (gameLog: ActionLog[]) => {
  const mergeContext = ActionUtils.getMergeContextThisTurn(gameLog);
  if (!mergeContext) {
    throw new Error("Expected merge context when selling shares");
  }

  return SharesUtils.getSharesCost(
    mergeContext.minority.hotelChain,
    mergeContext.minority.size
  );
};

const computeState = (
  gameInstance: IAcquireGameInstance,
  state: IGameState | null = null,
  actionResult: PlayerActionResult | null = null,
  gameLog: ActionLog[] = []
): ICashState => {
  if (!state) {
    return fillEmptyStates(gameInstance.playerIds, {});
  }

  if (!actionResult) {
    return state.cashState;
  }

  switch (actionResult.type) {
    case "Shares Purchased":
      return {
        ...state.cashState,
        [actionResult.action.playerId]:
          state.cashState[actionResult.action.playerId] -
          getSharesCost(actionResult.action.hotelChain, state.boardState),
      };
    case "Share Sold":
      return {
        ...state.cashState,
        [actionResult.action.playerId]:
          state.cashState[actionResult.action.playerId] +
          getSharesCostOfHotelBeforeMerge(gameLog),
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
