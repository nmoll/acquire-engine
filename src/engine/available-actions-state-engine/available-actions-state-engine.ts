import { GameConfig } from "../../game-config";
import { BoardSquareState, IGameState, ISharesState } from "../../model";
import { ActionLog } from "../../model/action-log";
import {
  AvailableActionType,
  ChooseShares,
} from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";
import { ICashState } from "../../model/cash-state";
import {
  KeepOrphanedShare,
  PlayerAction,
  PurchaseShares,
  SellOrphanedShare,
  StartHotelChain,
  TradeOrphanedShare,
} from "../../model/player-action";
import { PlayerActionResult } from "../../model/player-action-result";
import { ActionUtils } from "../../utils/action-utils";
import { HotelChainUtils } from "../../utils/hotel-chain-utils";
import { isDefined } from "../../utils/is-defined-util";
import { SharesUtils } from "../../utils/shares-utils";

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

const computeState = (
  boardState: BoardSquareState[],
  sharesState: ISharesState,
  cashState: ICashState,
  actionResult: PlayerActionResult | null = null,
  gameLog: ActionLog[] = []
): IAvailableActionState => {
  if (!actionResult) {
    return [AvailableActionType.ChooseTile()];
  }

  const playerId = actionResult.action.playerId;
  const playerCash = cashState[playerId];

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

    case "Hotel Auto Merged":
      const playerWithShares = SharesUtils.getNextPlayerWithOrphanedShares(
        sharesState,
        playerId,
        actionResult.minority.hotelChain,
        ActionUtils.getCurrentTurn(gameLog)
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

      return [
        AvailableActionType.ChooseToSellOrphanedShare(
          actionResult.minority.hotelChain,
          numShares
        ),
        AvailableActionType.ChooseToKeepOrphanedShare(
          actionResult.minority.hotelChain,
          numShares
        ),
        numShares > 1
          ? AvailableActionType.ChooseToTradeOrphanedShare(
              actionResult.minority.hotelChain,
              actionResult.majority.hotelChain,
              numShares
            )
          : null,
      ].filter(isDefined);

    case "Hotel Chain Started":
      return [
        chooseSharesIfAvailable(boardState, sharesState, playerCash),
        AvailableActionType.ChooseEndTurn(),
      ].filter(isDefined);

    case "Shares Purchased":
      const sharesPurchasedThisTurn = ActionUtils.getCurrentTurn(
        gameLog
      ).filter((log) => log.action.type === "PurchaseShares");

      return [
        sharesPurchasedThisTurn.length + 1 < GameConfig.turn.maxShares
          ? chooseSharesIfAvailable(boardState, sharesState, playerCash)
          : null,
        AvailableActionType.ChooseEndTurn(),
      ].filter(isDefined);

    case "Share Kept":
    case "Share Sold":
    case "Share Traded":
      const mergeContext = ActionUtils.getMergeContextThisTurn(gameLog);
      if (!mergeContext) {
        throw new Error("Expected to find merge context for current turn");
      }

      const playerWithUnresolvedShares =
        ActionUtils.findPlayerWithUnresolvedOrphanedShares(
          actionResult,
          gameLog
        );

      if (playerWithUnresolvedShares) {
        return [
          AvailableActionType.ChooseToSellOrphanedShare(
            mergeContext.minority.hotelChain,
            playerWithUnresolvedShares.shares
          ),
          AvailableActionType.ChooseToKeepOrphanedShare(
            mergeContext.minority.hotelChain,
            playerWithUnresolvedShares.shares
          ),
          playerWithUnresolvedShares.shares > 1
            ? AvailableActionType.ChooseToTradeOrphanedShare(
                mergeContext.minority.hotelChain,
                mergeContext.majority.hotelChain,
                playerWithUnresolvedShares.shares
              )
            : null,
        ].filter(isDefined);
      } else {
        return [
          chooseSharesIfAvailable(boardState, sharesState, playerCash),
          AvailableActionType.ChooseEndTurn(),
        ].filter(isDefined);
      }

    case "Turn Ended":
      return [AvailableActionType.ChooseTile()];

    default:
      return [AvailableActionType.ChooseTile()];
  }
};

const validatePlaceTile = (state: IAvailableActionState): boolean =>
  !!state.find((availableAction) => availableAction.type === "ChooseTile");

const validateStartHotelChain = (
  action: StartHotelChain,
  state: IAvailableActionState
): boolean =>
  !!state.find(
    (available) =>
      available.type === "ChooseHotelChain" &&
      available.hotelChains.includes(action.hotelChain)
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
      return validatePlaceTile(gameState.availableActionsState);
    case "StartHotelChain":
      return validateStartHotelChain(action, gameState.availableActionsState);
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
  computeState,
  validateAction,
};
