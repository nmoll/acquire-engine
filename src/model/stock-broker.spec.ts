import { describe, expect, it } from "vitest";
import { StockBroker } from "./stock-broker";
import { SharesStateFactory } from "../test/factory/shares-state.factory";
import { HotelManager } from "./hotel-manager";
import { BoardStateFactory } from "../test/factory/board-state.factory";

describe(StockBroker.name, () => {
  describe("getCashAwardedOnDissolve", () => {
    it("should award return single player for majority and minority if no one else has shares", () => {
      const sharesState = SharesStateFactory.createSharesState(`
                 A C F I L T W
              P1 0 4 0 0 0 0 0
              P2 0 0 0 1 0 0 0
              P3 0 0 0 0 0 0 0
              P4 0 0 0 0 0 0 1
              `);

      const boardState = BoardStateFactory.createBoardState(`
            - - - - - - - - - - - -
            - - - C C - - - - - - -
            - - - - 0 - - - - - - -
            - - - - W W - - - - - -
            - - - - - W - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            `);

      const broker = new StockBroker(sharesState);
      const hotelManager = new HotelManager(boardState);

      expect(
        broker.getCashAwardedOnDissolve(hotelManager.getHotel("Continental"))
      ).toEqual({
        "1": 6000,
      });
    });

    it("should split reward among multiple players for majority and minority in case of tie", () => {
      const sharesState = SharesStateFactory.createSharesState(`
             A C F I L T W
          P1 0 4 0 3 0 0 0
          P2 0 0 0 6 0 0 0
          P3 0 0 0 1 0 0 0
          P4 0 0 0 6 0 0 1
          `);

      const boardState = BoardStateFactory.createBoardState(`
          - - - - I - - - - - - -
          - - - I I - - - - - - -
          - - - - 0 - - - - - - -
          - - - - W W - - - - - -
          - - - - - W - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          `);

      const broker = new StockBroker(sharesState);
      const hotelManager = new HotelManager(boardState);

      expect(
        broker.getCashAwardedOnDissolve(hotelManager.getHotel("Imperial"))
      ).toEqual({
        "2": 3750,
        "4": 3750,
      });
    });

    it("should split reward among multiple minority shareholders in case of a tie", () => {
      const sharesState = SharesStateFactory.createSharesState(`
             A C F I L T W
          P1 1 4 0 3 0 0 0
          P2 1 0 0 6 0 0 0
          P3 1 0 0 1 0 0 0
          P4 2 0 0 6 0 0 1
          `);

      const boardState = BoardStateFactory.createBoardState(`
          - - - -  A A - - - - -
          - - - A A A - - - - - -
          - - - - 0 - - - - - - -
          - - - - W W W W - - - -
          - - - - - W W W - - - -
          - - - - - - W - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          `);

      const broker = new StockBroker(sharesState);
      const hotelManager = new HotelManager(boardState);

      expect(
        broker.getCashAwardedOnDissolve(hotelManager.getHotel("American"))
      ).toEqual({
        1: 1000,
        2: 1000,
        3: 1000,
        4: 6000,
      });
    });

    it("should award single majority and minority share holders", () => {
      const sharesState = SharesStateFactory.createSharesState(`
             A C F I L T W
          P1 1 4 0 3 0 0 0
          P2 1 0 0 6 0 0 0
          P3 1 0 0 1 0 0 0
          P4 2 0 0 0 0 0 1
          `);

      const boardState = BoardStateFactory.createBoardState(`
          - - - - - - - - - - - -
          - - - I I I - - - - - -
          - - - - 0 - - - - - - -
          - - - - W W W W - - - -
          - - - - - W W W - - - -
          - - - - - - W - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          `);

      const broker = new StockBroker(sharesState);
      const hotelManager = new HotelManager(boardState);

      expect(
        broker.getCashAwardedOnDissolve(hotelManager.getHotel("Imperial"))
      ).toEqual({
        1: 2500,
        2: 5000,
      });
    });
  });

  describe("getAvailableShares", () => {
    it("should return 25 if no shares owned for hotel", () => {
      const sharesState = SharesStateFactory.createSharesState(`
           A C F I L T W
        P1 0 1 0 0 0 0 0
        P2 0 0 0 1 0 0 0
        P3 0 0 0 0 0 0 0
        P4 0 0 0 0 0 0 1
        `);

      const broker = new StockBroker(sharesState);

      expect(broker.getAvailableShares("American")).toEqual(25);
    });

    it("should return remaining shares if shares are owned by players", () => {
      const sharesState = SharesStateFactory.createSharesState(`
           A C F I L T W
        P1 5 1 0 0 0 3 9
        P2 1 0 0 1 0 0 9
        P3 0 0 0 0 8 7 0
        P4 2 0 0 0 1 2 1
        `);

      const broker = new StockBroker(sharesState);

      expect(broker.getAvailableShares("American")).toEqual(17);
      expect(broker.getAvailableShares("Continental")).toEqual(24);
      expect(broker.getAvailableShares("Festival")).toEqual(25);
      expect(broker.getAvailableShares("Imperial")).toEqual(24);
      expect(broker.getAvailableShares("Luxor")).toEqual(16);
      expect(broker.getAvailableShares("Tower")).toEqual(13);
      expect(broker.getAvailableShares("Worldwide")).toEqual(6);
    });
  });
});
