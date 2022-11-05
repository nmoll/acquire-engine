import { GameConfig } from "../../game-config";
import { BoardSquareState, IGameState, ISharesState } from "../../model";
import {
  AvailableActionType,
  ChooseShares,
} from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";
import { ICashState } from "../../model/cash-state";
import {
  PlayerAction,
  PurchaseShares,
  StartHotelChain,
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
  history: PlayerAction[] = []
): IAvailableActionState => {
  if (!actionResult) {
    return [AvailableActionType.ChooseTile()];
  }

  const playerCash = cashState[actionResult.action.playerId];

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

    case "Hotel Chain Started":
      return [
        chooseSharesIfAvailable(boardState, sharesState, playerCash),
        AvailableActionType.ChooseEndTurn(),
      ].filter(isDefined);

    case "Shares Purchased":
      const sharesPurchasedThisTurn = ActionUtils.getCurrentTurn(
        history
      ).filter((action) => action.type === "PurchaseShares");

      return [
        sharesPurchasedThisTurn.length + 1 < GameConfig.turn.maxShares
          ? chooseSharesIfAvailable(boardState, sharesState, playerCash)
          : null,
        AvailableActionType.ChooseEndTurn(),
      ].filter(isDefined);

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
    case "EndTurn":
      return validateEndTurn(gameState.availableActionsState);
  }
  return true;
};

export const AvailableActionsStateEngine = {
  computeState,
  validateAction,
};
