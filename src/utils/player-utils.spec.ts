import { PlayerUtils } from "./player-utils";

describe("PlayerUtils", () => {
  describe(PlayerUtils.assignId.name, () => {
    it("should assign an id with the users name included", () => {
      const id = PlayerUtils.assignId("Nate");
      expect(/^[0-9]{4}_Nate$/.test(id)).toBe(true);
    });

    it("should parse name from id", () => {
      expect(PlayerUtils.getDisplayName("1234_Nate")).toEqual("Nate");
    });

    it("should handle names with underscores", () => {
      expect(PlayerUtils.getDisplayName("1234_Nate_Moll")).toEqual("Nate_Moll");
    });

    it("should handle name with space", () => {
      expect(PlayerUtils.getDisplayName("1234_Nate Moll")).toEqual("Nate Moll");
    });

    it("should return 'Unknown' if given undefined", () => {
      expect(PlayerUtils.getDisplayName(undefined)).toEqual("Unknown");
    });
  });
});
