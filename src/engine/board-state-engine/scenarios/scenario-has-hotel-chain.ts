import { BoardSquareStateType, HasHotelChain } from "../../../model";
import { PlayerActionContext } from "../../../model/player-action-context";
import { BoardUtils } from "../../../utils/board-utils";
import { HotelChainUtils } from "../../../utils/hotel-chain-utils";
import { IBoardStateScenario } from "./board-state-scenario";

export const ScenarioHasHotelChain: IBoardStateScenario = (
  context: PlayerActionContext
) =>
  mergerTile(context) ||
  minorityMergedIntoMajority(context) ||
  newHotelStarted(context) ||
  growHotelChain(context);

/**
 * Scenario where the tile is adjacent
 * to another and the player has chosen a hotel chain.
 *
 * @returns the chosen hotel chain
 */
const newHotelStarted = (
  context: PlayerActionContext
): HasHotelChain | false => {
  return context.playerAction.type === "StartHotelChain" &&
    context.boardState[context.index].type === "HasTile" &&
    BoardUtils.hasAdjacentTiles(context.boardState, context.index)
    ? BoardSquareStateType.HasHotelChain(context.playerAction.hotelChain)
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
):
  | {
      minority: HasHotelChain;
      majority: HasHotelChain;
    }
  | false => {
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

  return {
    minority: HotelChainUtils.getSmallestHotelChain(
      context.boardState,
      adjacentHotelChains
    ),
    majority: HotelChainUtils.getLargestHotelChain(
      context.boardState,
      adjacentHotelChains
    ),
  };
};

/**
 * Scenario where the played tile initiates a merge.
 *
 * @returns the hotel chain which will survive the merge.
 */
const mergerTile = (context: PlayerActionContext): HasHotelChain | false => {
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

  return mergeContext.majority;
};

/**
 * Scenario where the square is part of
 * the minority chain in the case of a merge.
 *
 * @returns the majority hotel chain
 */
const minorityMergedIntoMajority = (
  context: PlayerActionContext
): HasHotelChain | false => {
  const mergeContext = getMergeContext(context);

  if (!mergeContext) {
    return false;
  }

  const squareState = context.boardState[context.index];

  return squareState.type === "HasHotelChain" &&
    squareState.hotelChainType === mergeContext.minority.hotelChainType
    ? mergeContext.majority
    : false;
};

/**
 * Scenario where the square is a tile
 * which should be consumed by a hotel chain.
 *
 * @returns the hotel chain which will be grown.
 */
const growHotelChain = (
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

  return adjacentHotelChains.length
    ? BoardSquareStateType.HasHotelChain(adjacentHotelChains[0].hotelChainType)
    : false;
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
