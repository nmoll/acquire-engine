import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerAction } from "../../model/player-action";
import { ITileState } from "../../model/tile-state";
import { TileStateEngine } from "./tile-state-engine";

describe("TileStateEngine", () => {
  let gameInstance: IAcquireGameInstance;

  beforeEach(() => {
    gameInstance = {
      randomSeed: 1,
      playerIds: [1, 2, 3, 4],
    };
  });

  it("should return initial tile state if no given state", () => {
    expect(TileStateEngine.computeState(gameInstance)).toMatchSnapshot();
  });

  it("should return the same initial state for the same game instance", () => {
    expect(TileStateEngine.computeState(gameInstance)).toEqual(
      TileStateEngine.computeState(gameInstance)
    );
  });

  it("should remove player's tile when played", () => {
    const tileState: ITileState = {
      1: [4, 7, 21, 34, 19],
      2: [15, 84, 100, 3, 1],
      3: [2, 8, 11, 13, 62],
    };
    const tilePlaced = 7;
    const action: PlayerAction = {
      type: "PlaceTile",
      playerId: 1,
      boardSquareId: tilePlaced,
    };

    const expected: ITileState = {
      1: [4, 21, 34, 19],
      2: [15, 84, 100, 3, 1],
      3: [2, 8, 11, 13, 62],
    };

    expect(
      TileStateEngine.computeState(gameInstance, action, tileState)
    ).toEqual(expected);
  });

  it("should give player next tile when turn ends", () => {
    const initialState = TileStateEngine.computeState(gameInstance);
    const action: PlayerAction = {
      type: "EndTurn",
      playerId: 1,
    };

    const resultState = TileStateEngine.computeState(
      gameInstance,
      action,
      initialState
    );

    expect(resultState[1]).toEqual([9, 94, 91, 6, 3, 57]);
  });
});
