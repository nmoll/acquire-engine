import { GameConfig } from "../../game-config";
import {
  BoardSquareState,
  HotelChainType,
  IGameState,
  ISharesState,
} from "../../model";
import {
  AvailableActionType,
  ChooseShares,
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
import { ActionUtils } from "../../utils/action-utils";
import { HotelChainUtils } from "../../utils/hotel-chain-utils";
import { isDefined } from "../../utils/is-defined-util";
import { SharesUtils } from "../../utils/shares-utils";

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
  const actionResult = turnContext.actionResult;
  if (!currentPlayerId) {
    return [];
  }

  const playerCash = cashState[currentPlayerId];

  switch (actionResult.type) {
    case "Tile Placed":
    case "Hotel Size Increased":
      if (
        HotelChainUtils.isHotelStarter(
          boardState,
          actionResult.action.boardSquareId
        )
      ) {
        return [
          AvailableActionType.ChooseHotelChain(
            HotelChainUtils.getInactiveHotelChains(boardState)
          ),
        ];
      }

      return [
        chooseSharesIfAvailable(boardState, sharesState, playerCash),
        AvailableActionType.ChooseEndTurn(),
      ].filter(isDefined);

    case "Merge Initiated":
      return [
        AvailableActionType.ChooseMergeDirection(actionResult.hotelChains),
      ];

    case "Hote Merged":
      const playerWithShares = SharesUtils.getNextPlayerWithOrphanedShares(
        sharesState,
        currentPlayerId,
        actionResult.minority.hotelChain,
        turnContext.turnLog
      );
      const numShares = playerWithShares
        ? sharesState[playerWithShares.playerId][
            actionResult.minority.hotelChain
          ]
        : null;

      if (!numShares) {
        return [
          chooseSharesIfAvailable(boardState, sharesState, playerCash),
          AvailableActionType.ChooseEndTurn(),
        ].filter(isDefined);
      }

      return chooseOrphanedSharesOptions(
        actionResult.minority.hotelChain,
        actionResult.majority.hotelChain,
        numShares
      );

    case "Hotel Chain Started":
      return [
        chooseSharesIfAvailable(boardState, sharesState, playerCash),
        AvailableActionType.ChooseEndTurn(),
      ].filter(isDefined);

    case "Shares Purchased":
      const sharesPurchasedThisTurn = turnContext.turnLog.filter(
        (log) => log.action.type === "PurchaseShares"
      );

      return [
        sharesPurchasedThisTurn.length + 1 < GameConfig.turn.maxShares
          ? chooseSharesIfAvailable(boardState, sharesState, playerCash)
          : null,
        AvailableActionType.ChooseEndTurn(),
      ].filter(isDefined);

    case "Share Kept":
    case "Share Sold":
    case "Share Traded":
      const mergeContext = turnContext.mergeContext;
      if (!mergeContext) {
        throw new Error("Expected to find merge context for current turn");
      }

      const playerWithUnresolvedShares =
        ActionUtils.findPlayerWithUnresolvedOrphanedShares(turnContext);

      if (playerWithUnresolvedShares) {
        return chooseOrphanedSharesOptions(
          mergeContext.minority.hotelChain,
          mergeContext.majority.hotelChain,
          playerWithUnresolvedShares.shares
        );
      } else {
        return [
          chooseSharesIfAvailable(boardState, sharesState, playerCash),
          AvailableActionType.ChooseEndTurn(),
        ].filter(isDefined);
      }

    case "Turn Ended":
      return [chooseTile(tileState[currentPlayerId], boardState)];

    default:
      return [chooseTile(tileState[currentPlayerId], boardState)];
  }
};

const chooseSharesIfAvailable = (
  boardState: BoardSquareState[],
  sharesState: ISharesState,
  playerCash: number
): ChooseShares | null => {
  const hotelChainState = HotelChainUtils.getHotelChainState(
    boardState,
    sharesState
  );

  return Object.keys(hotelChainState).length
    ? AvailableActionType.ChooseShares(
        SharesUtils.getAvailableSharesForPurchase(hotelChainState, playerCash)
      )
    : null;
};

const chooseOrphanedSharesOptions = (
  minorityHotelChain: HotelChainType,
  majorityHotelChain: HotelChainType,
  remainingShares: number
): IAvailableActionState =>
  [
    AvailableActionType.ChooseToSellOrphanedShare(
      minorityHotelChain,
      remainingShares
    ),
    AvailableActionType.ChooseToKeepOrphanedShare(
      minorityHotelChain,
      remainingShares
    ),
    remainingShares > 1
      ? AvailableActionType.ChooseToTradeOrphanedShare(
          minorityHotelChain,
          majorityHotelChain,
          remainingShares
        )
      : null,
  ].filter(isDefined);

const chooseTile = (tiles: number[], boardState: BoardSquareState[]) => {
  const available: number[] = [];
  const unavailable: number[] = [];

  tiles.forEach((tile) => {
    if (isTilePlayable(tile, boardState)) {
      available.push(tile);
    } else {
      unavailable.push(tile);
    }
  });

  return AvailableActionType.ChooseTile({
    available,
    unavailable,
  });
};

const isTilePlayable = (
  tile: number,
  boardState: BoardSquareState[]
): boolean => {
  if (
    HotelChainUtils.isHotelStarter(boardState, tile) &&
    HotelChainUtils.getInactiveHotelChains(boardState).length === 0
  ) {
    return false;
  }

  return true;
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
      available.availableShares[action.hotelChain]
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
