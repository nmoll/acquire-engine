import { IGameState } from "../../model";
import { HotelManager } from "../../model/hotel-manager";
import { PlayerAction } from "../../model/player-action";
import { PlayerActionResult } from "../../model/player-action-result";
import { StockBroker } from "../../model/stock-broker";
import { HotelChainUtils } from "../../utils/hotel-chain-utils";

/**
 * Given a board state with a place tile action,
 * returns the result of applying the place tile action to the board state.
 */
const computeActionResult = (
  state: IGameState,
  action: PlayerAction
): PlayerActionResult => {
  const hotelManager = new HotelManager(state.boardState);
  const stockBroker = new StockBroker(state.sharesState);

  switch (action.type) {
    case "PlaceTile":
      const adjacentHotels = hotelManager.findAllAdjacentToSquare(
        action.boardSquareId
      );

      if (adjacentHotels.length === 1) {
        return {
          type: "Hotel Size Increased",
          action,
          hotelChain: adjacentHotels[0].type,
        };
      }

      if (adjacentHotels.length === 2) {
        const hotel1 = adjacentHotels[0];
        const hotel2 = adjacentHotels[1];

        if (hotel1.getSize() === hotel2.getSize()) {
          return {
            type: "Merge Initiated",
            action,
            hotelChains: [hotel1.type, hotel2.type],
          };
        } else {
          const majority =
            hotel1.getSize() > hotel2.getSize() ? hotel1 : hotel2;

          const minority =
            hotel1.getSize() < hotel2.getSize() ? hotel1 : hotel2;

          let cashAwarded: Record<string, number> =
            stockBroker.getCashAwardedOnDissolve(minority);

          return {
            type: "Hotel Merged",
            action,
            majority,
            minority,
            cashAwarded,
          };
        }
      }

      return {
        type: "Tile Placed",
        action,
      };

    case "Merge":
      const majority = hotelManager.getHotel(action.hotelChainToKeep);
      const minority = hotelManager.getHotel(action.hotelChainToDissolve);

      return {
        type: "Hotel Merged",
        action,
        majority,
        minority,
        cashAwarded: stockBroker.getCashAwardedOnDissolve(minority),
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
