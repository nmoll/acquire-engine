import { BoardStateFactory } from "../test/factory/board-state.factory";
import { getTilePosition } from "../test/helpers";
import { HotelChainUtils } from "./hotel-chain-utils";

describe("HotelChainUtils", () => {
  describe(HotelChainUtils.getActiveHotelChains.name, () => {
    it("should return active hotel chains", () => {
      const boardState = BoardStateFactory.createBoardState(`
        - - - - A - - - - - - -
        - - 0 - A A - - - - - -
        - - - - - - - - - - - -
        - L - - - - 0 - - - - -
        - L - - - - - - - - - -
        - L L L - T T - - - - -
        - L - L - - - - - - - -
        - - - - - 0 - - - - - -
        - - - - - - - - - - - -`);

      expect(HotelChainUtils.getActiveHotelChains(boardState)).toEqual([
        "American",
        "Luxor",
        "Tower",
      ]);
    });
  });

  describe(HotelChainUtils.getInactiveHotelChains.name, () => {
    it("should return inactive hotel chains", () => {
      const boardState = BoardStateFactory.createBoardState(`
          - - - - A - - - - - - -
          - - 0 - A A - - - - - -
          - - - - - - - - - - - -
          - L - - - - 0 - - - - -
          - L - - - - - - - - - -
          - L L L - T T - - - - -
          - L - L - - - - - - - -
          - - - - - 0 - - - - - -
          - - - - - - - - - - - -`);

      expect(HotelChainUtils.getInactiveHotelChains(boardState)).toEqual([
        "Continental",
        "Festival",
        "Imperial",
        "Worldwide",
      ]);
    });
  });

  describe(HotelChainUtils.isHotelStarter.name, () => {
    it("should return true if square is next to a tile", () => {
      const boardState = BoardStateFactory.createBoardState(`- - 0 -`);

      expect(HotelChainUtils.isHotelStarter(boardState, 1)).toBeTruthy();
    });

    it("should return false if square is not next to a tile", () => {
      const boardState = BoardStateFactory.createBoardState(`- - - -`);

      expect(HotelChainUtils.isHotelStarter(boardState, 1)).toBeFalsy();
    });

    it("should return false if square is next to a hotel", () => {
      const boardState = BoardStateFactory.createBoardState(`0 - T T`);

      expect(HotelChainUtils.isHotelStarter(boardState, 1)).toBeFalsy();
    });
  });

  describe(HotelChainUtils.getHotelChainPositions.name, () => {
    it("should return empty record if no hotel chains on the board", () => {
      const boardState = BoardStateFactory.createBoardState(
        `
          - - - - - -
          - - - - - -
          - - - - - -
          - - - - - -
          - - - - - -
        `
      );

      expect(HotelChainUtils.getHotelChainPositions(boardState)).toEqual({});
    });

    it("should get hotel chain positions from board state", () => {
      const boardState = BoardStateFactory.createBoardState(
        `
          T T - - - - - - - - - -
          - - - - L L L L - - - -
          0 0 - - - - L L - - - -
          - - A A - - - - - - - -
          0 - - A - - 0 - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
        `
      );

      const expected = {
        ["Tower"]: [getTilePosition("1A"), getTilePosition("2A")],
        ["Luxor"]: [
          getTilePosition("5B"),
          getTilePosition("6B"),
          getTilePosition("7B"),
          getTilePosition("8B"),
          getTilePosition("7C"),
          getTilePosition("8C"),
        ],
        ["American"]: [
          getTilePosition("3D"),
          getTilePosition("4D"),
          getTilePosition("4E"),
        ],
      };

      expect(HotelChainUtils.getHotelChainPositions(boardState)).toEqual(
        expected
      );
    });
  });
});
