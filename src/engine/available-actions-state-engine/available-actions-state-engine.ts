import { BoardSquareState, IGameState, ISharesState } from "../../model";
import {
  AvailableAction,
  AvailableActionType,
} from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";
import { ICashState } from "../../model/cash-state";
import { CurrentPlayerIdState } from "../../model/current-player-id-state";
import {
  KeepOrphanedShare,
  Merge,
  PlaceTile,
  PlayerAction,
  PurchaseShares,
  SellOrphanedShare,
  StartHotelChain,
  TradeOrphanedShare,
} from "../../model/player-action";
import { ITileState } from "../../model/tile-state";
import { TurnContext } from "../../model/turn-context";
import { AvailableActionStrategy } from "./strategy/available-action-strategy";
import { AvailablActionStrategyContext } from "./strategy/available-action-strategy-context";
import { ChooseEndGameStrategy } from "./strategy/choose-end-game-strategy";
import { ChooseEndTurnStrategy } from "./strategy/choose-end-turn-strategy";
import { ChooseHotelStrategy } from "./strategy/choose-hotel-strategy";
import { ChooseMergeDirectionStrategy } from "./strategy/choose-merge-direction-strategy";
import { ChooseOrphanedShareStrategy } from "./strategy/choose-orphaned-share-strategy";
import { ChooseSharesStrategy } from "./strategy/choose-shares-strategy";
import { ChooseTileStrategy } from "./strategy/choose-tile-strategy";

const getInitialState = (
  currentPlayerId: CurrentPlayerIdState,
  tileState: ITileState
): IAvailableActionState => [
  AvailableActionType.ChooseTile({
    available: currentPlayerId ? tileState[currentPlayerId] : [],
    unavailable: [],
  }),
];

const computeState = (
  boardState: BoardSquareState[],
  sharesState: ISharesState,
  cashState: ICashState,
  tileState: ITileState,
  turnContext: TurnContext,
  currentPlayerId: CurrentPlayerIdState
): IAvailableActionState => {
  if (!currentPlayerId) {
    return [];
  }

  const context: AvailablActionStrategyContext = {
    boardState,
    sharesState,
    cashState,
    tileState,
    turnContext,
    currentPlayerId,
  };

  const strategies: AvailableActionStrategy[] = [
    new ChooseTileStrategy(context),
    new ChooseHotelStrategy(context),
    new ChooseSharesStrategy(context),
    new ChooseMergeDirectionStrategy(context),
    new ChooseOrphanedShareStrategy(context),
    new ChooseEndTurnStrategy(),
    new ChooseEndGameStrategy(context),
  ];

  const allAvailableActions: AvailableAction[] = [];
  const requiredActions: AvailableAction[] = [];

  strategies.forEach((strategy) => {
    if (strategy.isRequired()) {
      requiredActions.push(...strategy.getAvailableActions());
    } else {
      allAvailableActions.push(...strategy.getAvailableActions());
    }
  });

  if (requiredActions.length) {
    return requiredActions;
  } else {
    return allAvailableActions;
  }
};

const validatePlaceTile = (
  action: PlaceTile,
  state: IAvailableActionState
): boolean =>
  !!state.find(
    (availableAction) =>
      availableAction.type === "ChooseTile" &&
      availableAction.available.includes(action.boardSquareId)
  );

const validateStartHotelChain = (
  action: StartHotelChain,
  state: IAvailableActionState
): boolean =>
  !!state.find(
    (available) =>
      available.type === "ChooseHotelChain" &&
      available.hotelChains.includes(action.hotelChain)
  );

const validateMerge = (action: Merge, state: IAvailableActionState): boolean =>
  state.some(
    (available) =>
      available.type === "ChooseMergeDirection" &&
      available.options.includes(action.hotelChainToKeep) &&
      available.options.includes(action.hotelChainToDissolve)
  );

const validatePurchaseShares = (
  action: PurchaseShares,
  state: IAvailableActionState
): boolean =>
  !!state.find(
    (available) =>
      available.type === "ChooseShares" &&
      available.hotelChains.includes(action.hotelChain)
  );

const validateSellOrphanedShare = (
  action: SellOrphanedShare,
  state: IAvailableActionState
): boolean =>
  !!state.find(
    (available) =>
      available.type === "ChooseToSellOrphanedShare" &&
      available.hotelChain === action.hotelChain
  );

const validateKeepOrphanedShare = (
  action: KeepOrphanedShare,
  state: IAvailableActionState
): boolean =>
  !!state.find(
    (available) =>
      available.type === "ChooseToKeepOrphanedShare" &&
      available.hotelChain === action.hotelChain
  );

const validateTradeOrphanedShare = (
  action: TradeOrphanedShare,
  state: IAvailableActionState
): boolean =>
  state.some(
    (available) =>
      available.type === "ChooseToTradeOrphanedShare" &&
      available.hotelChain === action.hotelChain &&
      available.hotelChainToReceive === action.hotelChainToReceive
  );

const validateEndTurn = (state: IAvailableActionState): boolean =>
  !!state.find((available) => available.type === "ChooseEndTurn");

const validateAction = (
  action: PlayerAction,
  gameState: IGameState
): boolean => {
  if (action.playerId !== gameState.currentPlayerIdState) {
    return false;
  }

  switch (action.type) {
    case "PlaceTile":
      return validatePlaceTile(action, gameState.availableActionsState);
    case "StartHotelChain":
      return validateStartHotelChain(action, gameState.availableActionsState);
    case "Merge":
      return validateMerge(action, gameState.availableActionsState);
    case "PurchaseShares":
      return validatePurchaseShares(action, gameState.availableActionsState);
    case "SellOrphanedShare":
      return validateSellOrphanedShare(action, gameState.availableActionsState);
    case "KeepOrphanedShare":
      return validateKeepOrphanedShare(action, gameState.availableActionsState);
    case "TradeOrphanedShare":
      return validateTradeOrphanedShare(
        action,
        gameState.availableActionsState
      );
    case "EndTurn":
      return validateEndTurn(gameState.availableActionsState);
  }
  return true;
};

export const AvailableActionsStateEngine = {
  getInitialState,
  computeState,
  validateAction,
};
