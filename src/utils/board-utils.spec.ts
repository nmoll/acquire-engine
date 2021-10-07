import { BoardStateFactory } from "../test/factory/board-state.factory";
import { getTilePosition } from "../test/helpers";
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
        BoardUtils.isAdjacent(
          boardStates,
          getTilePosition("4A"),
          getTilePosition("5A")
        )
      ).toBeTruthy();

      expect(
        BoardUtils.isAdjacent(
          boardStates,
          getTilePosition("1A"),
          getTilePosition("2A")
        )
      ).toBeTruthy();

      expect(
        BoardUtils.isAdjacent(
          boardStates,
          getTilePosition("7A"),
          getTilePosition("7B")
        )
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
        BoardUtils.isAdjacent(
          boardStates,
          getTilePosition("4A"),
          getTilePosition("8A")
        )
      ).toBeFalsy();

      expect(
        BoardUtils.isAdjacent(
          boardStates,
          getTilePosition("1D"),
          getTilePosition("1A")
        )
      ).toBeFalsy();

      expect(
        BoardUtils.isAdjacent(
          boardStates,
          getTilePosition("12B"),
          getTilePosition("1C")
        )
      ).toBeFalsy();
    });
  });
});
