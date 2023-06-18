import { GameConfig } from "../../game-config";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerActionResult } from "../../model/player-action-result";
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
        [new Intl.NumberFormat("en-US", {
          minimumIntegerDigits: 3,
        }).format(idx)]: toPos(idx),
      }),
      {}
    );

    expect(result).toMatchSnapshot();
  });

  it("should return initial tile state", () => {
    expect(TileStateEngine.getInitialState(gameInstance)).toMatchSnapshot();
  });

  it("should return the same initial state for the same game instance", () => {
    expect(TileStateEngine.getInitialState(gameInstance)).toEqual(
      TileStateEngine.getInitialState(gameInstance)
    );
  });

  it("should remove player's tile when played", () => {
    const tileState: ITileState = {
      1: [4, 7, 21, 34, 19],
      2: [15, 84, 100, 3, 1],
      3: [2, 8, 11, 13, 62],
    };
    const actionResult = PlayerActionResult.TilePlaced("1", 7);

    const expected: ITileState = {
      1: [4, 21, 34, 19],
      2: [15, 84, 100, 3, 1],
      3: [2, 8, 11, 13, 62],
    };

    expect(
      TileStateEngine.computeState(gameInstance, actionResult, tileState, [])
    ).toEqual(expected);
  });

  it("should give player next tile when turn ends", () => {
    const initialState = TileStateEngine.getInitialState(gameInstance);
    const actionResult = PlayerActionResult.TurnEnded("1");

    const resultState = TileStateEngine.computeState(
      gameInstance,
      actionResult,
      initialState,
      []
    );

    expect(resultState[1]).toEqual([11, 7, 63, 76, 46, 30]);
  });

  it("should do nothing if there are no tiles left", () => {
    const tileState: ITileState = {
      // The last tiles in the bag for this game seed
      1: [0, 67],
    };
    const actionResult = PlayerActionResult.TurnEnded("1");

    const resultState = TileStateEngine.computeState(
      gameInstance,
      actionResult,
      tileState,
      []
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

    const actionResult = PlayerActionResult.TurnEnded("2706_Justin");

    const expected: ITileState = {
      "2706_Justin": [97, 94, 12, 32, 0],
      "3208_Nate": [72, 105, 37, 6, 74],
    };

    expect(
      TileStateEngine.computeState(instance, actionResult, tileState, [])
    ).toEqual(expected);
  });
});
