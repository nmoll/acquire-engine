import { BoardSquareState, ISharesState } from "../../../model";
import { AvailableActionType } from "../../../model/available-action";
import { IAvailableActionState } from "../../../model/available-action-state";
import { PlaceTile } from "../../../model/player-action";
import { HotelChainUtils } from "../../../utils/hotel-chain-utils";
import { SharesUtils } from "../../../utils/shares-utils";

export const ScenarioTilePlaced = (
  action: PlaceTile,
  boardState: BoardSquareState[],
  sharesState: ISharesState
): IAvailableActionState => {
  if (HotelChainUtils.isHotelStarter(boardState, action.boardSquareId)) {
    return [
      AvailableActionType.ChooseHotelChain(
        HotelChainUtils.getInactiveHotelChains(boardState)
      ),
    ];
  }
  const activeHotelChains = HotelChainUtils.getActiveHotelChains(boardState);
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
};
