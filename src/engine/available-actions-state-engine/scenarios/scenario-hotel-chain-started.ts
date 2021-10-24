import { BoardSquareState, ISharesState } from "../../../model";
import { AvailableActionType } from "../../../model/available-action";
import { IAvailableActionState } from "../../../model/available-action-state";
import { HotelChainUtils } from "../../../utils/hotel-chain-utils";
import { SharesUtils } from "../../../utils/shares-utils";

export const ScenarioHotelChainStarted = (
  boardState: BoardSquareState[],
  sharesState: ISharesState,
  playerCash: number
): IAvailableActionState => [
  AvailableActionType.ChooseShares(
    SharesUtils.getAvailableSharesForPurchase(
      HotelChainUtils.getHotelChainState(boardState, sharesState),
      playerCash
    )
  ),
  AvailableActionType.ChooseEndTurn(),
];
