import { IGameState } from "../../model";
import { PlayerAction } from "../../model/player-action";
import { PlayerActionResult } from "../../model/player-action-result";
import { ArrayUtils } from "../../utils/array-utils";
import { HotelChainUtils } from "../../utils/hotel-chain-utils";
import { SharesUtils } from "../../utils/shares-utils";

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
          const majorityHotelChain =
            hotel1Size > hotel2Size
              ? adjacentHotelChains[0]
              : adjacentHotelChains[1];

          const minorityHotelChain =
            hotel1Size < hotel2Size
              ? adjacentHotelChains[0]
              : adjacentHotelChains[1];

          let cashAwarded: Record<string, number> = {};

          const { majorityShareholders, minorityShareholders } =
            SharesUtils.getMajorityAndMinorityShareholders(
              state.sharesState,
              minorityHotelChain
            );

          const majorityHotelSize = HotelChainUtils.getHotelSize(
            majorityHotelChain,
            state.boardState
          );

          const minorityHotelSize = HotelChainUtils.getHotelSize(
            minorityHotelChain,
            state.boardState
          );

          majorityShareholders.forEach((shareholder) => {
            const bonus = SharesUtils.getMajorityBonus(
              minorityHotelChain,
              minorityHotelSize
            );
            cashAwarded[shareholder] = Math.round(
              (cashAwarded[shareholder] ?? 0) +
                bonus / majorityShareholders.length
            );
          });

          minorityShareholders.forEach((shareholder) => {
            const bonus = SharesUtils.getMinorityBonus(
              minorityHotelChain,
              minorityHotelSize
            );
            cashAwarded[shareholder] = Math.round(
              (cashAwarded[shareholder] ?? 0) +
                bonus / minorityShareholders.length
            );
          });

          return {
            type: "Hotel Auto Merged",
            action,
            majority: {
              hotelChain: majorityHotelChain,
              size: majorityHotelSize,
            },
            minority: {
              hotelChain: minorityHotelChain,
              size: minorityHotelSize,
            },
            cashAwarded,
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
