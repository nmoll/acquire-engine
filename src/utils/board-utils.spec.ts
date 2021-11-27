import { BoardStateFactory } from "../test/factory/board-state.factory";
import { tile } from "../test/helpers";
import { BoardUtils } from "./board-utils";

describe("BoardUtils", () => {
  describe(BoardUtils.getAdjacentPositions.name, () => {
    it("should return adjacent positions on the board", () => {
      const boardState = BoardStateFactory.createBoardState(
        `
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -`
      );
      expect(BoardUtils.getAdjacentPositions(boardState, 0)).toEqual([1, 12]);
      expect(BoardUtils.getAdjacentPositions(boardState, 11)).toEqual([10, 23]);
      expect(BoardUtils.getAdjacentPositions(boardState, 13)).toEqual([
        1, 12, 14, 25,
      ]);
      expect(BoardUtils.getAdjacentPositions(boardState, 96)).toEqual([84, 97]);
      expect(BoardUtils.getAdjacentPositions(boardState, 107)).toEqual([
        95, 106,
      ]);
    });
  });

  describe(BoardUtils.isAdjacent.name, () => {
    it("should return true if two squares are adjacent", () => {
      const boardState = BoardStateFactory.createBoardState(
        `
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -`
      );

      expect(
        BoardUtils.isAdjacent(boardState, tile("4A"), tile("5A"))
      ).toBeTruthy();

      expect(
        BoardUtils.isAdjacent(boardState, tile("1A"), tile("2A"))
      ).toBeTruthy();

      expect(
        BoardUtils.isAdjacent(boardState, tile("7A"), tile("7B"))
      ).toBeTruthy();
    });

    it("should return true if two squares are adjacent", () => {
      const boardState = BoardStateFactory.createBoardState(
        `
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -`
      );

      expect(
        BoardUtils.isAdjacent(boardState, tile("4A"), tile("8A"))
      ).toBeFalsy();

      expect(
        BoardUtils.isAdjacent(boardState, tile("1D"), tile("1A"))
      ).toBeFalsy();

      expect(
        BoardUtils.isAdjacent(boardState, tile("12B"), tile("1C"))
      ).toBeFalsy();
    });
  });
});
