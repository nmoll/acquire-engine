import { GameConfig } from "../../game-config";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerAction } from "../../model/player-action";
import { ITileState } from "../../model/tile-state";
import { createGameInstance } from "../../test/factory/game-instance.factory";
import { ArrayUtils } from "../../utils/array-utils";
import { TileStateEngine } from "./tile-state-engine";

describe("TileStateEngine", () => {
  let gameInstance: IAcquireGameInstance;

  beforeEach(() => {
    gameInstance = createGameInstance({
      randomSeed: 1,
      playerIds: ["1", "2", "3", "4"],
    });
  });

  it("should create tile map", () => {
    const toPos = (index: number): string => {
      const x = index % 12;
      const y = Math.floor(index / 12);
      return `${x + 1}${["A", "B", "C", "D", "E", "F", "G", "H", "I"][y]}`;
    };

    const result = ArrayUtils.makeNumArray(GameConfig.board.size).reduce(
      (res, idx) => ({
        ...res,
        [idx]: toPos(idx),
      }),
      {}
    );

    expect(result).toMatchSnapshot();
  });

  it("should return initial tile state if no given state", () => {
    expect(TileStateEngine.computeState(gameInstance)).toMatchSnapshot();
  });

  it("should return given tile state if no action", () => {
    const tileState: ITileState = {
      1: [5, 2, 8, 7],
    };

    expect(TileStateEngine.computeState(gameInstance, null, tileState)).toEqual(
      tileState
    );
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
      playerId: "1",
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
      playerId: "1",
    };

    const resultState = TileStateEngine.computeState(
      gameInstance,
      action,
      initialState
    );

    expect(resultState[1]).toEqual([11, 7, 63, 76, 46, 30]);
  });

  it("should do nothing if there are no tiles left", () => {
    const tileState: ITileState = {
      // The last tiles in the bag for this game seed
      1: [0, 67],
    };
    const action: PlayerAction = {
      type: "EndTurn",
      playerId: "1",
    };

    const resultState = TileStateEngine.computeState(
      gameInstance,
      action,
      tileState
    );

    expect(resultState).toEqual(tileState);
  });

  it("should give player the next tile if the tile is '0'", () => {
    const instance: IAcquireGameInstance = {
      hostId: "3208_Nate",
      id: "3530722",
      playerIds: ["3208_Nate", "2706_Justin"],
      randomSeed: 866,
      state: "started",
    };

    const tileState: ITileState = {
      "2706_Justin": [97, 94, 12, 32],
      "3208_Nate": [72, 105, 37, 6, 74],
    };

    const action: PlayerAction = {
      type: "EndTurn",
      playerId: "2706_Justin",
    };

    const expected: ITileState = {
      "2706_Justin": [97, 94, 12, 32, 0],
      "3208_Nate": [72, 105, 37, 6, 74],
    };

    expect(TileStateEngine.computeState(instance, action, tileState)).toEqual(
      expected
    );
  });
});
