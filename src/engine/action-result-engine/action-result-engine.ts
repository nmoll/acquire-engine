import { IGameState } from "../../model";
import { PlayerAction } from "../../model/player-action";
import { PlayerActionResult } from "../../model/player-action-result";
import { ArrayUtils } from "../../utils/array-utils";
import { HotelChainUtils } from "../../utils/hotel-chain-utils";

/**
 * Given a board state with a place tile action,
 * returns the result of applying the place tile action to the board state.
 */
const computeActionResult = (
  state: IGameState,
  action: PlayerAction
): PlayerActionResult => {
  switch (action.type) {
    case "PlaceTile":
      const adjacentHotelChains = ArrayUtils.unique(
        HotelChainUtils.getAdjacentHotelChains(
          state.boardState,
          action.boardSquareId
        ).map((hotelChain) => hotelChain.hotelChainType)
      );

      if (adjacentHotelChains.length === 1) {
        return {
          type: "Hotel Size Increased",
          action,
          hotelChain: adjacentHotelChains[0],
        };
      }

      if (adjacentHotelChains.length === 2) {
        const hotel1Size = HotelChainUtils.getHotelSize(
          adjacentHotelChains[0],
          state.boardState
        );

        const hotel2Size = HotelChainUtils.getHotelSize(
          adjacentHotelChains[1],
          state.boardState
        );

        if (hotel1Size === hotel2Size) {
          return {
            type: "Merge Initiated",
            action,
            hotelChains: adjacentHotelChains,
          };
        } else {
          return {
            type: "Hotel Auto Merged",
            action,
            minorityHotelChain:
              hotel1Size < hotel2Size
                ? adjacentHotelChains[0]
                : adjacentHotelChains[1],
            majorityHotelChain:
              hotel1Size > hotel2Size
                ? adjacentHotelChains[0]
                : adjacentHotelChains[1],
          };
        }
      }

      return {
        type: "Tile Placed",
        action,
      };
    case "StartHotelChain":
      const boardSquareIds = state.boardState
        .map((_, idx) => idx)
        .filter(
          (idx) =>
            state.boardState[idx].type === "HasTile" &&
            HotelChainUtils.isHotelStarter(state.boardState, idx)
        );

      return {
        type: "Hotel Chain Started",
        action,
        boardSquareIds,
      };
    case "PurchaseShares":
      return {
        type: "Shares Purchased",
        action,
      };
    case "Merge":
      return {
        type: "Hotel Merge Direction Decided",
        action,
      };
    case "EndTurn":
      return {
        type: "Turn Ended",
        action,
      };
  }
};

export const ActionResultEngine = {
  computeActionResult,
};
