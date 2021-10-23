import { BoardSquareState, ISharesState } from "../../../model";
import { AvailableActionType } from "../../../model/available-action";
import { IAvailableActionState } from "../../../model/available-action-state";
import { PlaceTile } from "../../../model/player-action";
import { HotelChainUtils } from "../../../utils/hotel-chain-utils";
import { SharesUtils } from "../../../utils/shares-utils";

export const ScenarioTilePlaced = (
  action: PlaceTile,
  boardState: BoardSquareState[],
  sharesState: ISharesState,
  playerCash: number
): IAvailableActionState => {
  if (HotelChainUtils.isHotelStarter(boardState, action.boardSquareId)) {
    return [
      AvailableActionType.ChooseHotelChain(
        HotelChainUtils.getInactiveHotelChains(boardState)
      ),
    ];
  }
  const hotelChainPositions =
    HotelChainUtils.getHotelChainPositions(boardState);
  if (Object.keys(hotelChainPositions).length) {
    return [
      AvailableActionType.ChooseShares(
        SharesUtils.getAvailableSharesForPurchase(
          hotelChainPositions,
          sharesState,
          playerCash
        )
      ),
      AvailableActionType.ChooseEndTurn(),
    ];
  }
  return [AvailableActionType.ChooseEndTurn()];
};
