import { HotelChainType } from "../model";
import { BoardStateFactory } from "../test/factory/board-state.factory";
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
        HotelChainType.AMERICAN,
        HotelChainType.LUXOR,
        HotelChainType.TOWER,
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
        HotelChainType.CONTINENTAL,
        HotelChainType.FESTIVAL,
        HotelChainType.IMPERIAL,
        HotelChainType.WORLDWIDE,
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
});
