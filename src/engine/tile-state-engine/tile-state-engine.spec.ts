import { TileStateEngine } from "./tile-state-engine";

describe("TileStateEngine", () => {
  let playerIds: number[];

  beforeEach(() => {
    playerIds = [1, 2, 3, 4];
  });

  it("should return initial tile state if no actions", () => {
    expect(TileStateEngine.computeState(playerIds)).toEqual({
      availableTiles: [],
    });
  });
});
