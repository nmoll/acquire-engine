import { IGameState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { ICashState } from "../../model/cash-state";
import { PlayerAction, PlayerActionType } from "../../model/player-action";
import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { createGameInstance } from "../../test/factory/game-instance.factory";
import { createGameState } from "../../test/factory/game-state.factory";
import { SharesStateFactory } from "../../test/factory/shares-state.factory";
import { tile } from "../../test/helpers";
import { ActionResultEngine } from "../action-result-engine/action-result-engine";
import { CashStateEngine } from "./cash-state-engine";

describe("CashEngine", () => {
  let gameInstance: IAcquireGameInstance;

  const expectStateWithAction = (state: IGameState, action: PlayerAction) => {
    const actionResult = ActionResultEngine.computeActionResult(state, action);
    return expect(
      CashStateEngine.computeState(gameInstance, state, actionResult)
    );
  };

  beforeEach(() => {
    gameInstance = createGameInstance({
      randomSeed: 1,
      playerIds: ["1", "2", "3", "4"],
    });
  });

  describe("Game Start", () => {
    it("should give player 6000 if no actions played", () => {
      expect(CashStateEngine.computeState(gameInstance)).toEqual({
        1: 6000,
        2: 6000,
        3: 6000,
        4: 6000,
      });
    });
    it("should not give player 6000 cash if they have 0 after game is started", () => {
      expectStateWithAction(
        createGameState({
          cashState: {
            1: 0,
            2: 6000,
            3: 200,
            4: 0,
          },
        }),
        PlayerActionType.PlaceTile("1", tile("1A"))
      ).toEqual({
        1: 0,
        2: 6000,
        3: 200,
        4: 0,
      });
    });
  });

  describe("Place Tile", () => {
    it("should not add or subtract cash", () => {
      expectStateWithAction(
        createGameState({
          cashState: {
            1: 6000,
            2: 6000,
            3: 6000,
            4: 6000,
          },
        }),
        PlayerActionType.PlaceTile("1", tile("1A"))
      ).toEqual({
        1: 6000,
        2: 6000,
        3: 6000,
        4: 6000,
      });
    });
  });

  describe("Buy Shares", () => {
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

      expectStateWithAction(
        createGameState({
          cashState,
          boardState,
        }),
        PlayerActionType.PurchaseShares("2", "American")
      ).toEqual({
        1: 6000,
        2: 5700,
        3: 6000,
        4: 6000,
      });
    });
  });

  describe("Merge", () => {
    it("should award majority and minority holder with respective bonuses", () => {
      const cashState: ICashState = {
        1: 6000,
        2: 6000,
        3: 6000,
        4: 6000,
      };

      const sharesState = SharesStateFactory.createSharesState(`
               A C F I L T W
            P1 0 0 0 0 4 0 0
            P2 0 1 0 1 0 3 0
            P3 0 0 1 0 2 0 0
            P4 0 0 0 0 0 0 5
            `);

      const boardState = BoardStateFactory.createBoardState(
        `
          - - - - - - - - - - - -
          - - - - L - - - - - - -
          - - - - L L - - - - - -
          - - - - - L - - - - - -
          - - - - - - C C C - - -
          - - - - - - - C C - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          `
      );

      expectStateWithAction(
        createGameState({
          cashState,
          boardState,
          sharesState,
        }),
        PlayerActionType.PlaceTile("2", tile("6E"))
      ).toEqual({
        1: 10000,
        2: 6000,
        3: 8000,
        4: 6000,
      });
    });

    it("should award majority and minority bonuses to single player if they are sole owner", () => {
      const cashState: ICashState = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      };

      const sharesState = SharesStateFactory.createSharesState(`
               A C F I L T W
            P1 0 0 0 0 4 0 0
            P2 0 1 0 1 0 3 0
            P3 0 0 1 0 2 0 0
            P4 0 0 0 0 0 0 5
            `);

      const boardState = BoardStateFactory.createBoardState(
        `
          - - - - - - - - - - - -
          - - - - L - - - - - - -
          - - L L L L L L - - - -
          - - L L - L - - - - - -
          - - - - - - C C C - - -
          - - - - - - - C C - - -
          - - - - - - - C C C - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          `
      );

      expectStateWithAction(
        createGameState({
          cashState,
          boardState,
          sharesState,
        }),
        PlayerActionType.PlaceTile("2", tile("6E"))
      ).toEqual({
        1: 0,
        2: 12000,
        3: 0,
        4: 0,
      });
    });

    it("should split both bonuses between majority holders if there is a tie for majority", () => {
      const cashState: ICashState = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      };

      const sharesState = SharesStateFactory.createSharesState(`
               A C F I L T W
            P1 0 0 0 0 4 0 0
            P2 0 0 0 1 4 3 0
            P3 0 0 1 0 4 0 0
            P4 0 0 0 0 3 0 5
            `);

      const boardState = BoardStateFactory.createBoardState(
        `
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - L L - - - - - -
          - - - - - - C C C - - -
          - - - - - - - C C - - -
          - - - - - - - C C C - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          `
      );

      expectStateWithAction(
        createGameState({
          cashState,
          boardState,
          sharesState,
        }),
        PlayerActionType.PlaceTile("2", tile("6E"))
      ).toEqual({
        1: 1000,
        2: 1000,
        3: 1000,
        4: 0,
      });
    });

    it("should split minority bonus between minority holders if there is a tie for minority", () => {
      const cashState: ICashState = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      };

      const sharesState = SharesStateFactory.createSharesState(`
               A C F I L T W
            P1 0 0 0 0 4 0 4
            P2 0 0 0 1 4 3 12
            P3 0 0 1 0 4 0 4
            P4 0 0 0 0 3 0 1
            `);

      const boardState = BoardStateFactory.createBoardState(
        `
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - W W - - - - - -
          - - - - W W - - - - - -
          - - - - - - C C C - - -
          - - - - - - - C C - - -
          - - - - - - - C C C - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          `
      );

      expectStateWithAction(
        createGameState({
          cashState,
          boardState,
          sharesState,
        }),
        PlayerActionType.PlaceTile("2", tile("6E"))
      ).toEqual({
        1: 1250,
        2: 5000,
        3: 1250,
        4: 0,
      });
    });
  });
});
