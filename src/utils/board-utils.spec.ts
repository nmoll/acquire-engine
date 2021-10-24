import { BoardStateFactory } from "../test/factory/board-state.factory";
import { tile } from "../test/helpers";
import { BoardUtils } from "./board-utils";

describe("BoardBoardUtils", () => {
  describe(BoardUtils.getAdjacentPositions.name, () => {
    it("should return adjacent positions on the board", () => {
      const boardStates = BoardStateFactory.createBoardState(
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
      expect(BoardUtils.getAdjacentPositions(boardStates, 0)).toEqual([1, 12]);
      expect(BoardUtils.getAdjacentPositions(boardStates, 11)).toEqual([
        10, 23,
      ]);
      expect(BoardUtils.getAdjacentPositions(boardStates, 13)).toEqual([
        1, 12, 14, 25,
      ]);
      expect(BoardUtils.getAdjacentPositions(boardStates, 96)).toEqual([
        84, 97,
      ]);
      expect(BoardUtils.getAdjacentPositions(boardStates, 107)).toEqual([
        95, 106,
      ]);
    });
  });

  describe(BoardUtils.isAdjacent.name, () => {
    it("should return true if two squares are adjacent", () => {
      const boardStates = BoardStateFactory.createBoardState(
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
        BoardUtils.isAdjacent(boardStates, tile("4A"), tile("5A"))
      ).toBeTruthy();

      expect(
        BoardUtils.isAdjacent(boardStates, tile("1A"), tile("2A"))
      ).toBeTruthy();

      expect(
        BoardUtils.isAdjacent(boardStates, tile("7A"), tile("7B"))
      ).toBeTruthy();
    });

    it("should return true if two squares are adjacent", () => {
      const boardStates = BoardStateFactory.createBoardState(
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
        BoardUtils.isAdjacent(boardStates, tile("4A"), tile("8A"))
      ).toBeFalsy();

      expect(
        BoardUtils.isAdjacent(boardStates, tile("1D"), tile("1A"))
      ).toBeFalsy();

      expect(
        BoardUtils.isAdjacent(boardStates, tile("12B"), tile("1C"))
      ).toBeFalsy();
    });
  });
});
