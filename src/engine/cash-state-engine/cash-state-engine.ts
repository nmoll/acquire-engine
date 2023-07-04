import { GameConfig } from "../../game-config";
import { IGameState } from "../../model";
import { ICashState } from "../../model/cash-state";
import { HotelManager } from "../../model/hotel-manager";
import { TurnContext } from "../../model/turn-context";

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
  const hotelManager = new HotelManager(state.boardState);

  switch (turnContext.actionResult.type) {
    case "Shares Purchased":
      return {
        ...state.cashState,
        [turnContext.actionResult.action.playerId]:
          state.cashState[turnContext.actionResult.action.playerId] -
          hotelManager
            .getHotel(turnContext.actionResult.action.hotelChain)
            .getSharesCost(),
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

const getSharesCostOfHotelBeforeMerge = (turnContext: TurnContext) => {
  const mergeContext = turnContext.mergeContext;
  if (!mergeContext) {
    throw new Error("Expected merge context when selling shares");
  }

  return mergeContext.minority.getSharesCost();
};

export const CashStateEngine = {
  getInitialState,
  computeState,
};
