import { GameConfig } from "../../game-config";
import {
  BoardSquareState,
  BoardSquareStateType,
} from "../../model/board-square-state";
import { PlayerActionResult } from "../../model/player-action-result";
import { ArrayUtils } from "../../utils/array-utils";
import { BoardUtils } from "../../utils/board-utils";

const defaultState: BoardSquareState[] = ArrayUtils.makeNumArray(
  GameConfig.board.size
).map(() => BoardSquareStateType.Default());

const updateAll = (
  boardState: BoardSquareState[],
  boardSquareIds: number[],
  newState: BoardSquareState
): BoardSquareState[] =>
  boardState.map((state, index) =>
    boardSquareIds.includes(index) ? newState : state
  );

const computeState = (
  actionResult: PlayerActionResult | null = null,
  boardState: BoardSquareState[] = []
): BoardSquareState[] => {
  if (!boardState.length) {
    return defaultState;
  }
  if (!actionResult) {
    return boardState;
  }

  switch (actionResult.type) {
    case "Tile Placed":
    case "Merge Initiated":
      return updateAll(
        boardState,
        [actionResult.action.boardSquareId],
        BoardSquareStateType.HasTile()
      );

    case "Hotel Size Increased":
      const adjacentTiles = BoardUtils.getAdjacentPositions(
        boardState,
        actionResult.action.boardSquareId
      ).filter((idx) => boardState[idx].type === "HasTile");

      return updateAll(
        boardState,
        adjacentTiles.concat(actionResult.action.boardSquareId),
        BoardSquareStateType.HasHotelChain(actionResult.hotelChain)
      );

    case "Hotel Chain Started":
      return updateAll(
        boardState,
        actionResult.boardSquareIds,
        BoardSquareStateType.HasHotelChain(actionResult.action.hotelChain)
      );

    case "Hotel Auto Merged":
      const minorityBoardSquareIds = boardState
        .map((state, idx) => ({ state, idx }))
        .filter(
          ({ state }) =>
            state.type === "HasHotelChain" &&
            state.hotelChainType === actionResult.minority.hotelChain
        )
        .map(({ idx }) => idx);

      return updateAll(
        boardState,
        minorityBoardSquareIds.concat(actionResult.action.boardSquareId),
        BoardSquareStateType.HasHotelChain(actionResult.majority.hotelChain)
      );
    default:
      return boardState;
  }
};

export const BoardStateEngine = {
  computeState,
};
