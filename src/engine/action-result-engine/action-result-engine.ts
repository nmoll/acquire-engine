import { IGameState } from "../../model";
import { Board } from "../../model/board";
import { HotelManager } from "../../model/hotel-manager";
import { PlayerAction } from "../../model/player-action";
import { PlayerActionResult } from "../../model/player-action-result";
import { StockBroker } from "../../model/stock-broker";

/**
 * Given a board state with a place tile action,
 * returns the result of applying the place tile action to the board state.
 */
const computeActionResult = (
  state: IGameState,
  action: PlayerAction
): PlayerActionResult => {
  const board = new Board(state.boardState);
  const hotelManager = new HotelManager(state.boardState);
  const stockBroker = new StockBroker(state.sharesState);

  switch (action.type) {
    case "PlaceTile":
      const adjacentHotels = hotelManager.findAllAdjacentToSquare(
        action.boardSquareId
      );

      if (!adjacentHotels.length) {
        return {
          type: "Tile Placed",
          action,
        };
      }

      if (adjacentHotels.length === 1) {
        return {
          type: "Hotel Size Increased",
          action,
          hotel: adjacentHotels[0],
        };
      }

      const largest = hotelManager.getLargestHotel(adjacentHotels);

      if (largest.length > 1) {
        return {
          type: "Merge Initiated",
          action,
          hotels: largest,
        };
      } else {
        const survivor = largest[0];
        const dissolved = adjacentHotels.filter(
          (hotel) => !largest.some((h) => h.type === hotel.type)
        );

        let cashAwarded: Record<string, number> =
          stockBroker.getCashAwardedOnDissolve(dissolved);

        return {
          type: "Hotel Merged",
          action,
          survivor,
          dissolved,
          cashAwarded,
        };
      }

    case "Merge":
      const survivor = hotelManager.getHotel(action.hotelChainToKeep);
      const dissolved = hotelManager.getHotel(action.hotelChainToDissolve);

      return {
        type: "Hotel Merged",
        action,
        survivor,
        dissolved: [dissolved],
        cashAwarded: stockBroker.getCashAwardedOnDissolve([dissolved]),
      };

    case "StartHotelChain":
      const boardSquareIds = state.boardState
        .map((_, idx) => idx)
        .filter(
          (idx) =>
            state.boardState[idx].type === "HasTile" &&
            board.isHotelStarter(idx)
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
    case "SellOrphanedShare":
      return {
        type: "Share Sold",
        action,
      };
    case "KeepOrphanedShare":
      return {
        type: "Share Kept",
        action,
      };
    case "TradeOrphanedShare":
      return {
        type: "Share Traded",
        action,
      };
    case "EndTurn":
      return {
        type: "Turn Ended",
        action,
      };
    case "EndGame":
      return {
        type: "Game Ended",
        action,
      };
  }
};

export const ActionResultEngine = {
  computeActionResult,
};
