import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { getAdjacentPositions } from "./utils";

describe("utils", () => {
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
      expect(getAdjacentPositions(boardStates, 0)).toEqual([1, 12]);
      expect(getAdjacentPositions(boardStates, 11)).toEqual([10, 23]);
      expect(getAdjacentPositions(boardStates, 13)).toEqual([1, 12, 14, 25]);
      expect(getAdjacentPositions(boardStates, 96)).toEqual([84, 97]);
      expect(getAdjacentPositions(boardStates, 107)).toEqual([95, 106]);
    });
  });
});
