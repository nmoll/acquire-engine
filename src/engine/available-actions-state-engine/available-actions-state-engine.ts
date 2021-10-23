import { BoardSquareState, IGameState, ISharesState } from "../../model";
import { AvailableActionType } from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";
import { ICashState } from "../../model/cash-state";
import {
  PlayerAction,
  PurchaseShares,
  StartHotelChain,
} from "../../model/player-action";
import { ScenarioHotelChainStarted } from "./scenarios/scenario-hotel-chain-started";
import { ScenarioSharesPurchased } from "./scenarios/scenario-shares-purchased";
import { ScenarioTilePlaced } from "./scenarios/scenario-tile-placed";

const computeState = (
  boardState: BoardSquareState[],
  sharesState: ISharesState,
  cashState: ICashState,
  action: PlayerAction | null = null,
  history: PlayerAction[] | null = null
): IAvailableActionState => {
  if (!action) {
    return [AvailableActionType.ChooseTile()];
  }

  const playerCash = cashState[action.playerId];

  switch (action.type) {
    case "PlaceTile":
      return ScenarioTilePlaced(action, boardState, sharesState, playerCash);
    case "StartHotelChain":
      return ScenarioHotelChainStarted(boardState, sharesState, playerCash);
    case "Merge":
      return [AvailableActionType.ChooseEndTurn()];
    case "PurchaseShares":
      return ScenarioSharesPurchased(
        boardState,
        sharesState,
        playerCash,
        history
      );
    case "EndTurn":
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
