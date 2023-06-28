import { describe, expect, it } from "vitest";
import { ALL_HOTELS } from "../model";
import { SharesStateFactory } from "../test/factory/shares-state.factory";
import { ArrayUtils } from "./array-utils";
import { SharesUtils } from "./shares-utils";

const padNum = (num: number): string => (num < 10 ? `0${num}` : `${num}`);

describe("SharesUtils", () => {
  describe(SharesUtils.getAvailableShares.name, () => {
    it("should return 25 if no shares owned for hotel", () => {
      const sharesState = SharesStateFactory.createSharesState(`
           A C F I L T W
        P1 0 1 0 0 0 0 0
        P2 0 0 0 1 0 0 0
        P3 0 0 0 0 0 0 0
        P4 0 0 0 0 0 0 1
        `);
      expect(SharesUtils.getAvailableShares(sharesState, ["American"])).toEqual(
        {
          ["American"]: 25,
        }
      );
    });

    it("should return remaining shares if shares are owned by players", () => {
      const sharesState = SharesStateFactory.createSharesState(`
           A C F I L T W
        P1 5 1 0 0 0 3 9
        P2 1 0 0 1 0 0 9
        P3 0 0 0 0 8 7 0
        P4 2 0 0 0 1 2 1
        `);

      const hotels = ALL_HOTELS.map((hotel) => hotel);

      expect(SharesUtils.getAvailableShares(sharesState, hotels)).toEqual({
        ["American"]: 17,
        ["Continental"]: 24,
        ["Festival"]: 25,
        ["Imperial"]: 24,
        ["Luxor"]: 16,
        ["Tower"]: 13,
        ["Worldwide"]: 6,
      });
    });
  });

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

  describe(SharesUtils.getMajorityBonus.name, () => {
    it("should calculate majority bonus for the given hotel chain and size", () => {
      const hotelSizes = ArrayUtils.makeNumArray(45);
      const hotelPricesBySize = ALL_HOTELS.reduce(
        (accHotels, hotel) => ({
          ...accHotels,
          [hotel]: hotelSizes.reduce(
            (accSizes, hotelSize) => ({
              ...accSizes,
              [padNum(hotelSize)]: SharesUtils.getMajorityBonus(
                hotel,
                hotelSize
              ),
            }),
            {}
          ),
        }),
        {}
      );

      expect(hotelPricesBySize).toMatchSnapshot();
    });
  });

  describe(SharesUtils.getMinorityBonus.name, () => {
    it("should calculate minority bonus for the given hotel chain and size", () => {
      const hotelSizes = ArrayUtils.makeNumArray(45);
      const hotelPricesBySize = ALL_HOTELS.reduce(
        (accHotels, hotel) => ({
          ...accHotels,
          [hotel]: hotelSizes.reduce(
            (accSizes, hotelSize) => ({
              ...accSizes,
              [padNum(hotelSize)]: SharesUtils.getMinorityBonus(
                hotel,
                hotelSize
              ),
            }),
            {}
          ),
        }),
        {}
      );

      expect(hotelPricesBySize).toMatchSnapshot();
    });
  });

  describe(SharesUtils.getMajorityAndMinorityShareholders.name, () => {
    it("should return empty lists if no players own any shares", () => {
      const sharesState = SharesStateFactory.createSharesState(`
           A C F I L T W
        P1 0 0 0 0 2 0 0
        P2 0 1 0 1 0 3 0
        P3 0 0 1 0 0 0 0
        P4 0 0 0 0 0 0 5
        `);

      expect(
        SharesUtils.getMajorityAndMinorityShareholders(sharesState, "American")
      ).toEqual({
        majorityShareholders: [],
        minorityShareholders: [],
      });
    });

    it("should return single player for majority and minority if no one else has shares", () => {
      const sharesState = SharesStateFactory.createSharesState(`
             A C F I L T W
          P1 0 4 0 0 0 0 0
          P2 0 0 0 1 0 0 0
          P3 0 0 0 0 0 0 0
          P4 0 0 0 0 0 0 1
          `);

      expect(
        SharesUtils.getMajorityAndMinorityShareholders(
          sharesState,
          "Continental"
        )
      ).toEqual({
        majorityShareholders: ["1"],
        minorityShareholders: ["1"],
      });
    });

    it("should return multiple players for majority and minority if they tie for majority shares", () => {
      const sharesState = SharesStateFactory.createSharesState(`
             A C F I L T W
          P1 0 4 0 3 0 0 0
          P2 0 0 0 6 0 0 0
          P3 0 0 0 1 0 0 0
          P4 0 0 0 6 0 0 1
          `);

      expect(
        SharesUtils.getMajorityAndMinorityShareholders(sharesState, "Imperial")
      ).toEqual({
        majorityShareholders: ["2", "4"],
        minorityShareholders: ["2", "4"],
      });
    });

    it("should return multiple players for minority if they tie for minority shares", () => {
      const sharesState = SharesStateFactory.createSharesState(`
             A C F I L T W
          P1 1 4 0 3 0 0 0
          P2 1 0 0 6 0 0 0
          P3 1 0 0 1 0 0 0
          P4 2 0 0 6 0 0 1
          `);

      expect(
        SharesUtils.getMajorityAndMinorityShareholders(sharesState, "American")
      ).toEqual({
        majorityShareholders: ["4"],
        minorityShareholders: ["1", "2", "3"],
      });
    });

    it("should return single majority and minority share holder", () => {
      const sharesState = SharesStateFactory.createSharesState(`
             A C F I L T W
          P1 1 4 0 3 0 0 0
          P2 1 0 0 6 0 0 0
          P3 1 0 0 1 0 0 0
          P4 2 0 0 0 0 0 1
          `);

      expect(
        SharesUtils.getMajorityAndMinorityShareholders(sharesState, "Imperial")
      ).toEqual({
        majorityShareholders: ["2"],
        minorityShareholders: ["1"],
      });
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
