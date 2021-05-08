import { PlayerTurnFactory } from "../../../test/factory/player-turn.factory";
import {
  america,
  continental,
  imperial,
  player,
  plays,
  turn,
} from "../../../test/helpers";
import { ICashState } from "../../model/cash-state";
import { CashEngine } from "./cash-engine";

describe("CashEngine", () => {
  it("should give player 6000 to start with on their first turn", () => {
    expect(CashEngine.computeState(turn(player(1), plays("1A")))).toEqual({
      1: 6000,
    });
  });

  it("should not give player 6000 cash on subsequent turn if they have 0 cash", () => {
    expect(
      CashEngine.computeState(turn(player(1), plays("1A")), {
        1: 0,
      })
    ).toEqual({
      1: 0,
    });
  });

  it("should return existing cash state if no shares bought or sold", () => {
    expect(
      CashEngine.computeState(turn(player(1), plays("1A"), []), {
        1: 6000,
      })
    ).toEqual({
      1: 6000,
    });
  });

  it("should remove cash from the player for shares purchased", () => {
    const existingState: ICashState = {
      1: 6000,
      2: 6000,
      3: 6000,
      4: 6000,
    };

    const playerTurn = PlayerTurnFactory.createPlayerTurn({
      playerId: 2,
      sharesPurchased: [america(1), continental(2)],
    });

    expect(CashEngine.computeState(playerTurn, existingState)).toEqual({
      1: 6000,
      2: 4900,
      3: 6000,
      4: 6000,
    });
  });

  it("should add cash from the player for shares sold", () => {
    const existingState: ICashState = {
      1: 6000,
      2: 6000,
      3: 6000,
      4: 6000,
    };

    const playerTurn = PlayerTurnFactory.createPlayerTurn({
      playerId: 2,
      sharesSold: [imperial(3)],
    });

    expect(CashEngine.computeState(playerTurn, existingState)).toEqual({
      1: 6000,
      2: 6900,
      3: 6000,
      4: 6000,
    });
  });
});
