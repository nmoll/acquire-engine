import { BoardSquareState, IGameState, ISharesState } from "../../model";
import { AvailableActionType } from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";
import { PlayerAction } from "../../model/player-action";
import { BoardUtils } from "../../utils/board-utils";
import { SharesUtils } from "../../utils/shares-utils";

const computeState = (
  boardState: BoardSquareState[],
  sharesState: ISharesState,
  action: PlayerAction | null = null
): IAvailableActionState => {
  if (!action) {
    return [AvailableActionType.ChooseTile()];
  }

  const activeHotelChains = BoardUtils.getActiveHotelChains(boardState);

  switch (action.type) {
    case "PlaceTile":
      if (BoardUtils.isHotelStarter(boardState, action.boardSquareId)) {
        return [
          AvailableActionType.ChooseHotelChain(
            BoardUtils.getInactiveHotelChains(boardState)
          ),
        ];
      }
      if (activeHotelChains.length) {
        return [
          AvailableActionType.ChooseShares(
            SharesUtils.getAvailableSharesForPurchase(
              activeHotelChains,
              sharesState
            )
          ),
          AvailableActionType.ChooseEndTurn(),
        ];
      }
      return [AvailableActionType.ChooseEndTurn()];

    case "StartHotelChain":
      return [
        AvailableActionType.ChooseShares(
          SharesUtils.getAvailableSharesForPurchase(
            activeHotelChains,
            sharesState
          )
        ),
        AvailableActionType.ChooseEndTurn(),
      ];

    case "Merge":
      return [AvailableActionType.ChooseEndTurn()];

    case "PurchaseShares":
      return [AvailableActionType.ChooseEndTurn()];

    case "EndTurn":
      return [AvailableActionType.ChooseTile()];
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
