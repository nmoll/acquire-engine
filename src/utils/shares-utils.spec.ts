import { describe, expect, it } from "vitest";
import { ALL_HOTELS } from "../model";
import { SharesStateFactory } from "../test/factory/shares-state.factory";
import { ArrayUtils } from "./array-utils";
import { SharesUtils } from "./shares-utils";

const padNum = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

describe("SharesUtils", () => {
  describe(SharesUtils.getSharesCost.name, () => {
    it("should calculate share price for the given hotel chain and size", () => {
      const hotelSizes = ArrayUtils.makeNumArray(45);
      const hotelPricesBySize = ALL_HOTELS.reduce(
        (accHotels, hotel) => ({
          ...accHotels,
          [hotel]: hotelSizes.reduce(
            (accSizes, hotelSize) => ({
              ...accSizes,
              [padNum(hotelSize)]: SharesUtils.getSharesCost(hotel, hotelSize),
            }),
            {}
          ),
        }),
        {}
      );

      expect(hotelPricesBySize).toMatchSnapshot();
    });
  });

  describe(SharesUtils.getNextPlayerWithOrphanedShares.name, () => {
    it("should return the next player with shares of the given hotel", () => {
      const sharesState = SharesStateFactory.createSharesState(`
           A C F I L T W
        P1 1 0 0 0 2 0 0
        P2 0 1 0 1 0 3 0
        P3 5 0 1 0 0 0 0
        P4 0 0 0 0 0 0 5
        `);

      expect(
        SharesUtils.getNextPlayerWithOrphanedShares(
          sharesState,
          "1",
          "American",
          []
        )
      ).toEqual({ playerId: "1", remainingShares: 1 });

      expect(
        SharesUtils.getNextPlayerWithOrphanedShares(
          sharesState,
          "2",
          "American",
          []
        )
      ).toEqual({ playerId: "3", remainingShares: 5 });

      expect(
        SharesUtils.getNextPlayerWithOrphanedShares(
          sharesState,
          "3",
          "American",
          []
        )
      ).toEqual({ playerId: "3", remainingShares: 5 });

      expect(
        SharesUtils.getNextPlayerWithOrphanedShares(
          sharesState,
          "4",
          "American",
          []
        )
      ).toEqual({ playerId: "1", remainingShares: 1 });
    });

    it("should return null if no player owns shares for the given hotel", () => {
      const sharesState = SharesStateFactory.createSharesState(`
           A C F I L T W
        P1 1 0 0 0 2 0 0
        P2 0 1 0 1 0 3 0
        P3 5 0 0 0 0 0 0
        P4 0 0 0 0 0 0 5
        `);

      expect(
        SharesUtils.getNextPlayerWithOrphanedShares(
          sharesState,
          "1",
          "Festival",
          []
        )
      ).toEqual(null);
    });
  });
});
