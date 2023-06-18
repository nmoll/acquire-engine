import { GameConfig } from "../game-config";
import { ITileState } from "../model/tile-state";
import { TileUtils } from "./tile-utils";

describe("TileUtils", () => {
  describe("getSortedBag", () => {
    it("should return a tile bag sorted by the given seed", () => {
      const tileBag = TileUtils.getSortedBag(1);
      expect(tileBag).toMatchSnapshot();
      expect(tileBag.length).toEqual(GameConfig.board.size);
    });

    it("should return a different tile bag sorted by another seed", () => {
      const tileBag = TileUtils.getSortedBag(866);
      expect(tileBag).toMatchSnapshot();
      expect(tileBag.length).toEqual(GameConfig.board.size);
    });
  });

  describe("getNextTile", () => {
    it("should return first tile in bag if players have no tiles", () => {
      const tileBag = [3, 4, 7, 1];
      const tileState: ITileState = {};

      expect(TileUtils.getNextTile(tileBag, tileState, [])).toEqual(3);
    });

    it("should return the next tile not yet held by a player", () => {
      const tileBag = [3, 4, 7, 1, 8, 10];
      const tileState: ITileState = {
        1: [3, 4],
        2: [7],
      };

      expect(TileUtils.getNextTile(tileBag, tileState, [])).toEqual(1);
    });
  });
});
