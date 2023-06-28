import { it, describe, expect } from "vitest";
import { HotelChainState } from "../model/hotel-chain-state";
import { BoardStateFactory } from "../test/factory/board-state.factory";
import { SharesStateFactory } from "../test/factory/shares-state.factory";
import { tile } from "../test/helpers";
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

  describe(HotelChainUtils.getHotelChainState.name, () => {
    it("should return initial state if no hotel chains on the board", () => {
      const boardState = BoardStateFactory.createBoardState(
        `
          - - - - - -
          - - - - - -
          - - - - - -
          - - - - - -
          - - - - - -
        `
      );

      const sharesState = SharesStateFactory.createSharesState(`
          A C F I L T W
        P1 0 0 0 0 0 0 0
        P2 0 0 0 0 0 0 0
        P3 0 0 0 0 0 0 0
        P4 0 0 0 0 0 0 0
      `);

      expect(
        HotelChainUtils.getHotelChainState(boardState, sharesState)
      ).toEqual({});
    });

    it("should get hotel chain state", () => {
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

      const sharesState = SharesStateFactory.createSharesState(`
           A C F I L T W
        P1 0 0 0 0 5 1 0
        P2 0 0 0 0 0 2 0
        P3 0 0 0 0 7 4 0
        P4 0 0 0 0 8 0 0
      `);

      const expected: HotelChainState = {
        American: {
          boardSquareIds: [tile("3D"), tile("4D"), tile("4E")],
          availableShares: 25,
        },
        Tower: {
          boardSquareIds: [tile("1A"), tile("2A")],
          availableShares: 18,
        },
        Luxor: {
          boardSquareIds: [
            tile("5B"),
            tile("6B"),
            tile("7B"),
            tile("8B"),
            tile("7C"),
            tile("8C"),
          ],
          availableShares: 5,
        },
      };

      expect(
        HotelChainUtils.getHotelChainState(boardState, sharesState)
      ).toEqual(expected);
    });
  });
});
