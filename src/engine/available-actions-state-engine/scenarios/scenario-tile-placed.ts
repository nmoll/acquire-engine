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

  const hotelChainState = HotelChainUtils.getHotelChainState(
    boardState,
    sharesState
  );

  const adjacentHotelChains = HotelChainUtils.getAdjacentHotelChains(
    boardState,
    action.boardSquareId
  );
  if (
    adjacentHotelChains.length === 2 &&
    hotelChainState[adjacentHotelChains[0].hotelChainType]?.boardSquareIds
      .length ===
      hotelChainState[adjacentHotelChains[1].hotelChainType]?.boardSquareIds
        .length
  ) {
    return [
      AvailableActionType.ChooseMergeDirection(
        adjacentHotelChains.map((chain) => chain.hotelChainType)
      ),
    ];
  }

  if (Object.keys(hotelChainState).length) {
    return [
      AvailableActionType.ChooseShares(
        SharesUtils.getAvailableSharesForPurchase(hotelChainState, playerCash)
      ),
      AvailableActionType.ChooseEndTurn(),
    ];
  }
  return [AvailableActionType.ChooseEndTurn()];
};
