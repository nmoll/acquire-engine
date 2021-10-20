import { BoardSquareState, IGameState, ISharesState } from "../../model";
import { AvailableActionType } from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";
import { PlayerAction, StartHotelChain } from "../../model/player-action";
import { ScenarioHotelChainStarted } from "./scenarios/scenario-hotel-chain-started";
import { ScenarioTilePlaced } from "./scenarios/scenario-tile-placed";

const computeState = (
  boardState: BoardSquareState[],
  sharesState: ISharesState,
  action: PlayerAction | null = null
): IAvailableActionState => {
  if (!action) {
    return [AvailableActionType.ChooseTile()];
  }

  switch (action.type) {
    case "PlaceTile":
      return ScenarioTilePlaced(action, boardState, sharesState);
    case "StartHotelChain":
      return ScenarioHotelChainStarted(boardState, sharesState);
    case "Merge":
      return [AvailableActionType.ChooseEndTurn()];
    case "PurchaseShares":
      return [AvailableActionType.ChooseEndTurn()];
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
    case "EndTurn":
      return validateEndTurn(gameState.availableActionsState);
  }
  return true;
};

export const AvailableActionsStateEngine = {
  computeState,
  validateAction,
};
