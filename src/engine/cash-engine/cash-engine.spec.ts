import { america, continental, getTilePosition } from "../../../test/helpers";
import { ICashState } from "../../model/cash-state";
import { PlayerActionType } from "../../model/player-action";
import { CashEngine } from "./cash-engine";

describe("CashEngine", () => {
  let playerIds: number[];

  beforeEach(() => {
    playerIds = [1, 2, 3, 4];
  });

  it("should give player 6000 to start with", () => {
    expect(CashEngine.computeState(playerIds)).toEqual({
      1: 6000,
      2: 6000,
      3: 6000,
      4: 6000,
    });
  });

  it("should not give player 6000 cash on subsequent action if they have 0 cash", () => {
    expect(
      CashEngine.computeState(
        playerIds,
        PlayerActionType.PlaceTile(1, getTilePosition("1A")),
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
      CashEngine.computeState(
        playerIds,
        PlayerActionType.PlaceTile(1, getTilePosition("1A")),
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

    const playerAction = PlayerActionType.PurchaseShares(2, [
      america(1),
      continental(2),
    ]);

    expect(
      CashEngine.computeState(playerIds, playerAction, existingState)
    ).toEqual({
      1: 6000,
      2: 4900,
      3: 6000,
      4: 6000,
    });
  });
});
