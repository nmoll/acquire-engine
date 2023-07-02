import { GameConfig } from "../../game-config";
import { BoardSquareState, HotelChainType, IGameState } from "../../model";
import { ICashState } from "../../model/cash-state";
import { TurnContext } from "../../model/turn-context";
import { HotelChainUtils } from "../../utils/hotel-chain-utils";
import { SharesUtils } from "../../utils/shares-utils";

const getInitialState = (playerIds: string[]): ICashState =>
  playerIds.reduce(
    (state, playerId) => ({
      ...state,
      [playerId]: (state[playerId] = GameConfig.cash.startingAmount),
    }),
    {} as ICashState
  );

const computeState = (
  state: IGameState,
  turnContext: TurnContext
): ICashState => {
  switch (turnContext.actionResult.type) {
    case "Shares Purchased":
      return {
        ...state.cashState,
        [turnContext.actionResult.action.playerId]:
          state.cashState[turnContext.actionResult.action.playerId] -
          getSharesCost(
            turnContext.actionResult.action.hotelChain,
            state.boardState
          ),
      };
    case "Share Sold":
      return {
        ...state.cashState,
        [turnContext.actionResult.action.playerId]:
          state.cashState[turnContext.actionResult.action.playerId] +
          getSharesCostOfHotelBeforeMerge(turnContext),
      };
    case "Hotel Merged":
      return Object.entries(turnContext.actionResult.cashAwarded).reduce(
        (state, [playerId, cashAwarded]) => ({
          ...state,
          [playerId]: state[playerId] + cashAwarded,
        }),
        state.cashState
      );
  }

  return state.cashState;
};

const getSharesCost = (
  hotelChain: HotelChainType,
  boardState: BoardSquareState[]
) =>
  SharesUtils.getSharesCost(
    hotelChain,
    HotelChainUtils.getHotelSize(hotelChain, boardState)
  );

const getSharesCostOfHotelBeforeMerge = (turnContext: TurnContext) => {
  const mergeContext = turnContext.mergeContext;
  if (!mergeContext) {
    throw new Error("Expected merge context when selling shares");
  }

  return SharesUtils.getSharesCost(
    mergeContext.minority.type,
    mergeContext.minority.getSize()
  );
};

export const CashStateEngine = {
  getInitialState,
  computeState,
};
