import {
  BoardSquareStateType,
  HasHotelChain,
  HotelChainType,
} from "../../../model";
import { PlayerActionContext } from "../../../model/player-action-context";
import { BoardUtils } from "../../../utils/board-utils";
import { HotelChainUtils } from "../../../utils/hotel-chain-utils";

interface MergeContext {
  smaller: {
    hotelChain: HotelChainType;
    size: number;
  };
  larger: {
    hotelChain: HotelChainType;
    size: number;
  };
}

/**
 * If square should be converted into a hotel chain, returns the hotel chain type,
 * otherwise returns false.
 */
export const ScenarioHasHotelChain = (context: PlayerActionContext) =>
  ScenarioTileIsMergeInitiator(context) ||
  ScenarioHotelChainConsumedByMerge(context) ||
  ScenarioTilePartOfNewHotelChain(context) ||
  ScenarioTileConsumedByHotelChain(context);

/**
 * Scenario where the played tile initiates a merge.
 *
 * @returns the hotel chain which will survive the merge.
 */
const ScenarioTileIsMergeInitiator = (
  context: PlayerActionContext
): HasHotelChain | false => {
  if (
    context.playerAction.type !== "PlaceTile" ||
    context.playerAction.boardSquareId !== context.index
  ) {
    return false;
  }

  const mergeContext = getMergeContext(context);
  if (!mergeContext) {
    return false;
  }

  return {
    type: "HasHotelChain",
    hotelChainType: mergeContext.larger.hotelChain,
  };
};

/**
 * Scenario where the square is part of
 * the minority chain in the case of a merge.
 *
 * @returns the majority hotel chain
 */
const ScenarioHotelChainConsumedByMerge = (
  context: PlayerActionContext
): HasHotelChain | false => {
  const squareState = context.boardState[context.index];

  // if (context.playerAction.type === "Merge") {
  //   if ()
  //   if (squareState.type !== "HasHotelChain") {
  //     return false;
  //   } else {
  //     const adjacentHotelChainTypes = HotelChainUtils.getAdjacentHotelChains(
  //       context.boardState,
  //       context.index
  //     ).map((chain) => chain.hotelChainType);
  //     return adjacentHotelChainTypes.includes(squareState.hotelChainType)
  //       ? {
  //           type: "HasHotelChain",
  //           hotelChainType: context.playerAction.hotelChainToKeep,
  //         }
  //       : false;
  //   }
  // }

  const mergeContext = getMergeContext(context);

  if (!mergeContext) {
    return false;
  }

  return squareState.type === "HasHotelChain" &&
    squareState.hotelChainType === mergeContext.smaller.hotelChain
    ? {
        type: "HasHotelChain",
        hotelChainType: mergeContext.larger.hotelChain,
      }
    : false;
};

/**
 * Scenario where the tile is adjacent
 * to another and the player has chosen a hotel chain.
 *
 * @returns the chosen hotel chain
 */
const ScenarioTilePartOfNewHotelChain = (
  context: PlayerActionContext
): HasHotelChain | false => {
  return context.playerAction.type === "StartHotelChain" &&
    context.boardState[context.index].type === "HasTile" &&
    BoardUtils.hasAdjacentTiles(context.boardState, context.index)
    ? BoardSquareStateType.HasHotelChain(context.playerAction.hotelChain)
    : false;
};

/**
 * Scenario where the square is a tile
 * which should be consumed by a hotel chain.
 *
 * @returns the hotel chain which will be grown.
 */
const ScenarioTileConsumedByHotelChain = (
  context: PlayerActionContext
): HasHotelChain | false => {
  if (
    context.playerAction.type !== "PlaceTile" ||
    !(isPlayedTile(context) || isTileAdjacentToPlayedTile(context))
  ) {
    return false;
  }

  const adjacentHotelChains = HotelChainUtils.getAdjacentHotelChains(
    context.boardState,
    context.playerAction.boardSquareId
  );

  if (adjacentHotelChains.length !== 1) {
    return false;
  }

  return adjacentHotelChains.length
    ? BoardSquareStateType.HasHotelChain(adjacentHotelChains[0].hotelChainType)
    : false;
};

/**
 * Gets context of hotel chains involved
 * in the case of a merge.
 *
 * @returns the minority and majority chains in a merge,
 * otherwise false if there is no merge.
 */
const getMergeContext = (
  context: PlayerActionContext
): MergeContext | false => {
  if (context.playerAction.type !== "PlaceTile") {
    return false;
  }

  const adjacentHotelChains = HotelChainUtils.getAdjacentHotelChains(
    context.boardState,
    context.playerAction.boardSquareId
  );

  if (adjacentHotelChains.length < 2) {
    return false;
  }

  const minority = HotelChainUtils.getSmallestHotelChain(
    context.boardState,
    adjacentHotelChains
  );
  const minoritySize = HotelChainUtils.getHotelSize(
    minority.hotelChainType,
    context.boardState
  );

  const majority = HotelChainUtils.getLargestHotelChain(
    context.boardState,
    adjacentHotelChains
  );
  const majoritySize = HotelChainUtils.getHotelSize(
    majority.hotelChainType,
    context.boardState
  );

  if (minoritySize === majoritySize) {
    return false;
  }

  return {
    smaller: {
      hotelChain: minority.hotelChainType,
      size: HotelChainUtils.getHotelSize(
        minority.hotelChainType,
        context.boardState
      ),
    },
    larger: {
      hotelChain: majority.hotelChainType,
      size: HotelChainUtils.getHotelSize(
        minority.hotelChainType,
        context.boardState
      ),
    },
  };
};

/**
 * Whether the square is the square that
 * the player placed a tile on.
 */
const isPlayedTile = (context: PlayerActionContext): boolean =>
  context.playerAction.type === "PlaceTile" &&
  context.playerAction.boardSquareId === context.index;

/**
 * Whether the square is adjacent to the square
 * that the player place a tile on.
 */
const isTileAdjacentToPlayedTile = (context: PlayerActionContext): boolean =>
  context.playerAction.type === "PlaceTile" &&
  context.boardState[context.index].type === "HasTile" &&
  BoardUtils.isAdjacent(
    context.boardState,
    context.index,
    context.playerAction.boardSquareId
  );
