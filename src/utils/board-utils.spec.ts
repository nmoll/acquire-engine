import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { BoardUtils } from "./board-utils";

describe("BoardBoardUtils", () => {
  describe("getAdjacentPositions()", () => {
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
        10,
        23,
      ]);
      expect(BoardUtils.getAdjacentPositions(boardStates, 13)).toEqual([
        1,
        12,
        14,
        25,
      ]);
      expect(BoardUtils.getAdjacentPositions(boardStates, 96)).toEqual([
        84,
        97,
      ]);
      expect(BoardUtils.getAdjacentPositions(boardStates, 107)).toEqual([
        95,
        106,
      ]);
    });
  });
});
