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
});
