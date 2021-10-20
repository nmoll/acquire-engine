import { HotelChainType } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { ICashState } from "../../model/cash-state";
import { PlayerActionType } from "../../model/player-action";
import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { createGameInstance } from "../../test/factory/game-instance.factory";
import { getTilePosition } from "../../test/helpers";
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
        PlayerActionType.PlaceTile("1", getTilePosition("1A")),
        {
          1: 0,
          2: 6000,
          3: 200,
          4: 0,
        }
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
        PlayerActionType.PlaceTile("1", getTilePosition("1A")),
        {
          1: 6000,
          2: 6000,
          3: 6000,
          4: 6000,
        }
      )
    ).toEqual({
      1: 6000,
      2: 6000,
      3: 6000,
      4: 6000,
    });
  });

  it("should remove cash from the player for shares purchased", () => {
    const existingState: ICashState = {
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

    const playerAction = PlayerActionType.PurchaseShares(
      "2",
      HotelChainType.AMERICAN
    );

    expect(
      CashStateEngine.computeState(
        gameInstance,
        playerAction,
        existingState,
        boardState
      )
    ).toEqual({
      1: 6000,
      2: 5700,
      3: 6000,
      4: 6000,
    });
  });
});
