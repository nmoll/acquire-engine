import {
  BoardSquareState,
  BoardSquareStateType,
  HasHotelChain,
} from "../../../model";
import { PlayerActionContext } from "../../../model/player-action-context";
import { BoardUtils } from "../../../utils/board-utils";
import { IBoardStateScenario } from "./board-state-scenario";

export const ScenarioHasHotelChain: IBoardStateScenario = {
  resolve: (context: PlayerActionContext): BoardSquareState | false =>
    mergerTile(context) ||
    minorityMergedIntoMajority(context) ||
    newHotelStarted(context) ||
    growHotelChain(context),
};

const newHotelStarted = (
  context: PlayerActionContext
): HasHotelChain | false => {
  return context.playerAction.type === "StartHotelChain" &&
    context.boardState[context.index].type === "HasTile" &&
    BoardUtils.hasAdjacentTiles(context.boardState, context.index)
    ? BoardSquareStateType.HasHotelChain(context.playerAction.hotelChain)
    : false;
};

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

  const adjacentHotelChains = BoardUtils.getAdjacentHotelChains(
    context.boardState,
    context.playerAction.boardSquareId
  );

  if (adjacentHotelChains.length < 2) {
    return false;
  }

  return {
    minority: BoardUtils.getMinorityHotelChain(
      context.boardState,
      adjacentHotelChains
    ),
    majority: BoardUtils.getLargestHotelChain(
      context.boardState,
      adjacentHotelChains
    ),
  };
};

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

const growHotelChain = (
  context: PlayerActionContext
): HasHotelChain | false => {
  if (
    context.playerAction.type !== "PlaceTile" ||
    context.playerAction.boardSquareId !== context.index
  ) {
    return false;
  }

  const adjacentHotelChains = BoardUtils.getAdjacentHotelChains(
    context.boardState,
    context.playerAction.boardSquareId
  );

  if (!adjacentHotelChains.length) {
    return false;
  }

  return BoardSquareStateType.HasHotelChain(
    adjacentHotelChains[0].hotelChainType
  );
};
