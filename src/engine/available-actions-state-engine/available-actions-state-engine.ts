import {
  BoardSquareState,
  HotelChainType,
  IGameState,
  ISharesState,
} from "../../model";
import {
  ChooseEndTurn,
  ChooseHotelChain,
  ChooseShares,
  ChooseTile,
} from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";
import { PlayerAction } from "../../model/player-action";
import { BoardUtils } from "../../utils/board-utils";
import { SharesUtils } from "../../utils/shares-utils";

const chooseTile = (): ChooseTile => ({
  type: "ChooseTile",
});

const chooseEndTurn = (): ChooseEndTurn => ({
  type: "ChooseEndTurn",
});

const chooseHotelChain = (hotelChains: HotelChainType[]): ChooseHotelChain => ({
  type: "ChooseHotelChain",
  hotelChains,
});

const chooseShares = (
  hotelChains: HotelChainType[],
  sharesState: ISharesState
): ChooseShares => ({
  type: "ChooseShares",
  availableShares: hotelChains.reduce(
    (result, hotelChain) => ({
      ...result,
      [hotelChain]: Math.min(
        SharesUtils.getAvailableSharesForHotel(sharesState, hotelChain),
        3
      ),
    }),
    {}
  ),
});

const computeState = (
  boardState: BoardSquareState[],
  sharesState: ISharesState,
  action: PlayerAction | null = null
): IAvailableActionState => {
  if (!action) {
    return [chooseTile()];
  }

  const activeHotelChains = BoardUtils.getActiveHotelChains(boardState);

  switch (action.type) {
    case "PlaceTile":
      if (BoardUtils.isHotelStarter(boardState, action.boardSquareId)) {
        return [
          chooseHotelChain(BoardUtils.getInactiveHotelChains(boardState)),
        ];
      }
      if (activeHotelChains.length) {
        return [chooseShares(activeHotelChains, sharesState), chooseEndTurn()];
      }
      return [chooseEndTurn()];

    case "StartHotelChain":
      return [chooseShares(activeHotelChains, sharesState), chooseEndTurn()];

    case "Merge":
      return [chooseEndTurn()];

    case "PurchaseShares":
      return [chooseEndTurn()];

    case "EndTurn":
      return [chooseTile()];
  }
};

const validateAction = (
  action: PlayerAction,
  gameState: IGameState
): boolean => {
  if (action.playerId !== gameState.currentPlayerIdState) {
    return false;
  }

  switch (action.type) {
    case "PlaceTile":
      return !!gameState.availableActionsState.find(
        (action) => action.type === "ChooseTile"
      );
    case "StartHotelChain":
      return !!gameState.availableActionsState.find(
        (a) =>
          a.type === "ChooseHotelChain" &&
          a.hotelChains.includes(action.hotelChain)
      );
    case "EndTurn":
      return !!gameState.availableActionsState.find(
        (action) => action.type === "ChooseEndTurn"
      );
  }
  return true;
};

export const AvailableActionsStateEngine = {
  computeState,
  validateAction,
};
