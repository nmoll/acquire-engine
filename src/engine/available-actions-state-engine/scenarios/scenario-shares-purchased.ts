import { GameConfig } from "../../../game-config";
import { BoardSquareState, ISharesState } from "../../../model";
import { AvailableActionType } from "../../../model/available-action";
import { IAvailableActionState } from "../../../model/available-action-state";
import { PlayerAction } from "../../../model/player-action";
import { ActionUtils } from "../../../utils/action-utils";
import { HotelChainUtils } from "../../../utils/hotel-chain-utils";
import { SharesUtils } from "../../../utils/shares-utils";

const sharesPurchasedThisTurn = (history: PlayerAction[]): number =>
  ActionUtils.getCurrentTurn(history).filter(
    (action) => action.type === "PurchaseShares"
  ).length;

export const ScenarioSharesPurchased = (
  boardState: BoardSquareState[],
  sharesState: ISharesState,
  playerCash: number,
  history: PlayerAction[] | null
): IAvailableActionState => {
  const result: IAvailableActionState = [AvailableActionType.ChooseEndTurn()];

  if (
    !history ||
    // Add one for the current purchase
    sharesPurchasedThisTurn(history) + 1 < GameConfig.turn.maxShares
  ) {
    result.unshift(
      AvailableActionType.ChooseShares(
        SharesUtils.getAvailableSharesForPurchase(
          HotelChainUtils.getHotelChainPositions(boardState),
          sharesState,
          playerCash
        )
      )
    );
  }
  return result;
};
