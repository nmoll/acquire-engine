import { GameConfig } from "../../game-config";
import { Board } from "../../model/board";
import {
  BoardSquareState,
  BoardSquareStateType,
} from "../../model/board-square-state";
import { PlayerActionResult } from "../../model/player-action-result";

const getInitialState = () =>
  Board.createEmpty(GameConfig.board.size).getState();

const computeState = (
  actionResult: PlayerActionResult,
  boardState: BoardSquareState[]
): BoardSquareState[] => {
  const board = new Board(boardState);
  switch (actionResult.type) {
    case "Tile Placed":
    case "Merge Initiated":
      return board
        .update(
          actionResult.action.boardSquareId,
          BoardSquareStateType.HasTile()
        )
        .getState();

    case "Hotel Size Increased":
      return board
        .updateAdjacentTiles(
          actionResult.action.boardSquareId,
          BoardSquareStateType.HasHotelChain(actionResult.hotel.type)
        )
        .getState();

    case "Hotel Chain Started":
      return board
        .updateAll(
          actionResult.boardSquareIds,
          BoardSquareStateType.HasHotelChain(actionResult.action.hotelChain)
        )
        .getState();

    case "Hotel Merged":
      const mergerTile =
        actionResult.action.type === "PlaceTile"
          ? actionResult.action.boardSquareId
          : null;

      return board
        .mergeHotels(actionResult.minority, actionResult.majority, mergerTile)
        .getState();

    default:
      return boardState;
  }
};

export const BoardStateEngine = {
  getInitialState,
  computeState,
};
