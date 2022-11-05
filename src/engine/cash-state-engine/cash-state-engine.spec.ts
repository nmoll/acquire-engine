import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { ICashState } from "../../model/cash-state";
import { PlayerActionResult } from "../../model/player-action-result";
import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { createGameInstance } from "../../test/factory/game-instance.factory";
import { createGameState } from "../../test/factory/game-state.factory";
import { tile } from "../../test/helpers";
import { CashStateEngine } from "./cash-state-engine";

describe("CashEngine", () => {
  let gameInstance: IAcquireGameInstance;

  beforeEach(() => {
    gameInstance = createGameInstance({
      randomSeed: 1,
      playerIds: ["1", "2", "3", "4"],
    });
  });

  it("should give player 6000 to start with", () => {
    expect(CashStateEngine.computeState(gameInstance)).toEqual({
      1: 6000,
      2: 6000,
      3: 6000,
      4: 6000,
    });
  });

  it("should not give player 6000 cash on subsequent action if they have 0 cash", () => {
    expect(
      CashStateEngine.computeState(
        gameInstance,
        createGameState({
          cashState: {
            1: 0,
            2: 6000,
            3: 200,
            4: 0,
          },
        }),
        PlayerActionResult.TilePlaced("1", tile("1A"))
      )
    ).toEqual({
      1: 0,
      2: 6000,
      3: 200,
      4: 0,
    });
  });

  it("should return existing cash state if no shares bought or sold", () => {
    expect(
      CashStateEngine.computeState(
        gameInstance,
        createGameState({
          cashState: {
            1: 6000,
            2: 6000,
            3: 6000,
            4: 6000,
          },
        }),
        PlayerActionResult.TilePlaced("1", tile("1A"))
      )
    ).toEqual({
      1: 6000,
      2: 6000,
      3: 6000,
      4: 6000,
    });
  });

  it("should remove cash from the player for shares purchased", () => {
    const cashState: ICashState = {
      1: 6000,
      2: 6000,
      3: 6000,
      4: 6000,
    };

    const boardState = BoardStateFactory.createBoardState(
      `
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - C - - - - - -
      - - - - - C - - - - - -
      - - - - - - - - L L L -
      - - - - - - - - - - - -
      - - - A A - - - 0 - - - 
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      `
    );

    expect(
      CashStateEngine.computeState(
        gameInstance,
        createGameState({
          cashState,
          boardState,
        }),
        PlayerActionResult.SharesPurchased("2", "American")
      )
    ).toEqual({
      1: 6000,
      2: 5700,
      3: 6000,
      4: 6000,
    });
  });

  it.skip("should award majority holder with majority bonus after merge", () => {
    const cashState: ICashState = {
      1: 6000,
      2: 6000,
      3: 6000,
      4: 6000,
    };

    const boardState = BoardStateFactory.createBoardState(
      `
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - L - - - - - -
      - - - - - L - - - - - -
      - - - - - - C C C - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - - 
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      `
    );

    const playerAction = PlayerActionResult.TilePlaced("2", tile("6E"));

    expect(
      CashStateEngine.computeState(
        gameInstance,
        createGameState({
          cashState,
          boardState,
        }),
        playerAction
      )
    ).toEqual({
      1: 6000,
      2: 8000,
      3: 6000,
      4: 6000,
    });
  });
});
