import { BoardSquareState, ISharesState } from "../../model";
import { AvailableAction } from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";
import { ICashState } from "../../model/cash-state";
import { CurrentPlayerIdState } from "../../model/current-player-id-state";
import { PlayerAction, PlayerActionType } from "../../model/player-action";
import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { createGameState } from "../../test/factory/game-state.factory";
import { SharesStateFactory } from "../../test/factory/shares-state.factory";
import { tile } from "../../test/helpers";
import { BoardStateEngine } from "../board-state-engine/board-state-engine";
import { AvailableActionsStateEngine } from "./available-actions-state-engine";

describe("AvailableActionsStateEngine", () => {
  describe(AvailableActionsStateEngine.computeState.name, () => {
    it("should be 'ChooseTile' action is null", () => {
      const boardState = BoardStateEngine.computeState();
      const sharesState = SharesStateFactory.createSharesState(``);
      const cashState: ICashState = {};

      const expected: IAvailableActionState = [
        {
          type: "ChooseTile",
        },
      ];

      expect(
        AvailableActionsStateEngine.computeState(
          boardState,
          sharesState,
          cashState
        )
      ).toEqual(expected);
    });

    it("should be 'ChooseTile' action if the last action was EndTurn", () => {
      const boardState = BoardStateEngine.computeState();
      const sharesState = SharesStateFactory.createSharesState(``);
      const cashState: ICashState = {};

      const action: PlayerAction = {
        type: "EndTurn",
        playerId: "2",
      };

      const expected: IAvailableActionState = [
        {
          type: "ChooseTile",
        },
      ];

      expect(
        AvailableActionsStateEngine.computeState(
          boardState,
          sharesState,
          cashState,
          action
        )
      ).toEqual(expected);
    });

    it("should be 'ChooseHotelChain' with inactive hotels if played starter tile", () => {
      const boardState = BoardStateFactory.createBoardState(`
          - 0 - - A A - 
          - - T T - - - 
          0 - T - - W W 
        `);
      const sharesState = SharesStateFactory.createSharesState(``);
      const cashState: ICashState = {};

      const action: PlayerAction = {
        type: "PlaceTile",
        playerId: "1",
        boardSquareId: 0,
      };

      const expected: AvailableAction[] = [
        {
          type: "ChooseHotelChain",
          hotelChains: ["Continental", "Festival", "Imperial", "Luxor"],
        },
      ];

      expect(
        AvailableActionsStateEngine.computeState(
          boardState,
          sharesState,
          cashState,
          action
        )
      ).toEqual(expected);
    });

    it("should be 'ChooseMergeDirection' if tile is played between two equal sized hotel chains", () => {
      const boardState = BoardStateFactory.createBoardState(
        `
        - - W W W W - - - - - -
        - - - - - - - - - - - -
        - - L L - - - - - - - -
        - - L L - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
      `
      );

      const sharesState = SharesStateFactory.createSharesState(`
           A C F I L T W
        P1 0 0 0 0 0 0 0
        P2 0 0 0 0 0 0 0
      `);

      const cashState: ICashState = {
        1: 6000,
        2: 6000,
      };

      const action = PlayerActionType.PlaceTile("1", tile("4B"));

      const expected: IAvailableActionState = [
        {
          type: "ChooseMergeDirection",
          options: ["Worldwide", "Luxor"],
        },
      ];

      expect(
        AvailableActionsStateEngine.computeState(
          boardState,
          sharesState,
          cashState,
          action
        )
      ).toEqual(expected);
    });

    describe("ChooseShares", () => {
      let boardState: BoardSquareState[];
      let sharesState: ISharesState;

      beforeEach(() => {
        boardState = BoardStateFactory.createBoardState(`
          F F - - -
          - - A A -
          - - - A -
          W W - - -
        `);

        // Festival:  2 owned
        // American:  23 owned
        // Worldwide: 25 owned
        sharesState = SharesStateFactory.createSharesState(`
             A C F I L T W
          P1 9 1 0 2 0 4 9
          P2 4 0 0 1 0 7 9
          P3 7 0 2 0 8 0 7
          P4 3 0 0 5 0 0 0
        `);
      });

      it("should be available after PlaceTile action", () => {
        const action: PlayerAction = {
          type: "PlaceTile",
          playerId: "1",
          boardSquareId: 6,
        };
        const cashState: ICashState = {
          1: 6000,
        };

        expect(
          AvailableActionsStateEngine.computeState(
            boardState,
            sharesState,
            cashState,
            action
          )
        ).toEqual([
          {
            type: "ChooseShares",
            availableShares: {
              Festival: true,
              American: true,
              Worldwide: false,
            },
          },
          {
            type: "ChooseEndTurn",
          },
        ]);
      });

      it("should be available after StartHotelChain action", () => {
        const action: PlayerAction = {
          type: "StartHotelChain",
          playerId: "1",
          hotelChain: "Festival",
        };
        const cashState: ICashState = {
          1: 6000,
        };

        expect(
          AvailableActionsStateEngine.computeState(
            boardState,
            sharesState,
            cashState,
            action
          )
        ).toEqual([
          {
            type: "ChooseShares",
            availableShares: {
              Festival: true,
              American: true,
              Worldwide: false,
            },
          },
          {
            type: "ChooseEndTurn",
          },
        ]);
      });

      it("should be available after PurchaseShares action if player can purchase more", () => {
        const action: PlayerAction = {
          type: "PurchaseShares",
          playerId: "1",
          hotelChain: "Festival",
        };

        const cashState: ICashState = {
          1: 6000,
        };

        const history: PlayerAction[] = [
          {
            type: "PurchaseShares",
            playerId: "1",
            hotelChain: "American",
          },
        ];

        const expected: IAvailableActionState = [
          {
            type: "ChooseShares",
            availableShares: {
              Festival: true,
              American: true,
              Worldwide: false,
            },
          },
          {
            type: "ChooseEndTurn",
          },
        ];

        expect(
          AvailableActionsStateEngine.computeState(
            boardState,
            sharesState,
            cashState,
            action,
            history
          )
        ).toEqual(expected);
      });

      it("should have stocks be unavailable if player can't afford it", () => {
        const action: PlayerAction = {
          type: "PurchaseShares",
          playerId: "1",
          hotelChain: "Festival",
        };

        const cashState: ICashState = {
          1: 300,
        };

        const history: PlayerAction[] = [];

        const expected: IAvailableActionState = [
          {
            type: "ChooseShares",
            availableShares: {
              Festival: true,
              American: false,
              Worldwide: false,
            },
          },
          {
            type: "ChooseEndTurn",
          },
        ];

        expect(
          AvailableActionsStateEngine.computeState(
            boardState,
            sharesState,
            cashState,
            action,
            history
          )
        ).toEqual(expected);
      });

      it("should not be available after PurchaseShares action if player has purchased 3 shares already", () => {
        const action: PlayerAction = {
          type: "PurchaseShares",
          playerId: "1",
          hotelChain: "Festival",
        };

        const cashState: ICashState = {
          1: 6000,
        };

        const history: PlayerAction[] = [
          {
            type: "PurchaseShares",
            playerId: "1",
            hotelChain: "American",
          },
          {
            type: "PurchaseShares",
            playerId: "1",
            hotelChain: "American",
          },
        ];

        const expected: IAvailableActionState = [
          {
            type: "ChooseEndTurn",
          },
        ];

        expect(
          AvailableActionsStateEngine.computeState(
            boardState,
            sharesState,
            cashState,
            action,
            history
          )
        ).toEqual(expected);
      });

      it("should not be available after EndTurn", () => {
        const action: PlayerAction = {
          type: "EndTurn",
          playerId: "1",
        };
        const cashState: ICashState = {
          1: 6000,
        };

        expect(
          AvailableActionsStateEngine.computeState(
            boardState,
            sharesState,
            cashState,
            action
          )
        ).toEqual([
          {
            type: "ChooseTile",
          },
        ]);
      });
    });

    it("should be 'ChooseEndTurn' if tile has been placed by player", () => {
      const boardState = BoardStateEngine.computeState();
      const sharesState = SharesStateFactory.createSharesState(``);
      const cashState: ICashState = {
        1: 6000,
      };

      const action: PlayerAction = {
        type: "PlaceTile",
        playerId: "1",
        boardSquareId: 2,
      };

      const expected: IAvailableActionState = [
        {
          type: "ChooseEndTurn",
        },
      ];

      expect(
        AvailableActionsStateEngine.computeState(
          boardState,
          sharesState,
          cashState,
          action
        )
      ).toEqual(expected);
    });
  });

  describe(AvailableActionsStateEngine.validateAction.name, () => {
    const currentPlayerIdState: CurrentPlayerIdState = "1";

    describe(PlayerActionType.PlaceTile, () => {
      it("should return true if action is available", () => {
        const gameState = createGameState({
          currentPlayerIdState,
          availableActionsState: [
            {
              type: "ChooseTile",
            },
          ],
        });
        const action: PlayerAction = {
          type: "PlaceTile",
          playerId: "1",
          boardSquareId: 1,
        };

        expect(
          AvailableActionsStateEngine.validateAction(action, gameState)
        ).toBeTruthy();
      });

      it("should return false if action isnt by current player", () => {
        const gameState = createGameState({
          currentPlayerIdState,
          availableActionsState: [
            {
              type: "ChooseTile",
            },
          ],
        });
        const action: PlayerAction = {
          type: "PlaceTile",
          playerId: "2",
          boardSquareId: 1,
        };

        expect(
          AvailableActionsStateEngine.validateAction(action, gameState)
        ).toBeFalsy();
      });

      it("should return false if action is not available", () => {
        const gameState = createGameState({
          currentPlayerIdState,
          availableActionsState: [
            {
              type: "ChooseEndTurn",
            },
          ],
        });
        const action: PlayerAction = {
          type: "PlaceTile",
          playerId: "1",
          boardSquareId: 1,
        };

        expect(
          AvailableActionsStateEngine.validateAction(action, gameState)
        ).toBeFalsy();
      });
    });

    describe(PlayerActionType.StartHotelChain.name, () => {
      it("should return true if action is available for the given hotel", () => {
        const gameState = createGameState({
          currentPlayerIdState,
          availableActionsState: [
            {
              type: "ChooseHotelChain",
              hotelChains: ["Continental", "American", "Festival"],
            },
          ],
        });
        const action: PlayerAction = {
          type: "StartHotelChain",
          playerId: "1",
          hotelChain: "American",
        };

        expect(
          AvailableActionsStateEngine.validateAction(action, gameState)
        ).toBeTruthy();
      });

      it("should return false if hotel chain is not available", () => {
        const gameState = createGameState({
          currentPlayerIdState,
          availableActionsState: [
            {
              type: "ChooseHotelChain",
              hotelChains: ["Continental", "Festival"],
            },
          ],
        });
        const action: PlayerAction = {
          type: "StartHotelChain",
          playerId: "1",
          hotelChain: "American",
        };

        expect(
          AvailableActionsStateEngine.validateAction(action, gameState)
        ).toBeFalsy();
      });
    });

    describe(PlayerActionType.PurchaseShares.name, () => {
      it("should return true if hotel chain is available for purchase", () => {
        const gameState = createGameState({
          currentPlayerIdState,
          availableActionsState: [
            {
              type: "ChooseShares",
              availableShares: {
                American: true,
              },
            },
          ],
        });
        const action: PlayerAction = {
          type: "PurchaseShares",
          playerId: "1",
          hotelChain: "American",
        };

        expect(
          AvailableActionsStateEngine.validateAction(action, gameState)
        ).toBeTruthy();
      });

      it("should return false if share is not available to purchase", () => {
        const gameState = createGameState({
          currentPlayerIdState,
          availableActionsState: [
            {
              type: "ChooseShares",
              availableShares: {
                American: false,
              },
            },
          ],
        });
        const action: PlayerAction = {
          type: "PurchaseShares",
          playerId: "1",
          hotelChain: "American",
        };

        expect(
          AvailableActionsStateEngine.validateAction(action, gameState)
        ).toBeFalsy();
      });
    });

    describe(PlayerActionType.EndTurn.name, () => {
      it("should return true if action is available", () => {
        const gameState = createGameState({
          currentPlayerIdState,
          availableActionsState: [
            {
              type: "ChooseEndTurn",
            },
          ],
        });
        const action: PlayerAction = {
          type: "EndTurn",
          playerId: "1",
        };

        expect(
          AvailableActionsStateEngine.validateAction(action, gameState)
        ).toBeTruthy();
      });

      it("should return false if action is not available", () => {
        const gameState = createGameState({
          currentPlayerIdState,
          availableActionsState: [
            {
              type: "ChooseTile",
            },
          ],
        });
        const action: PlayerAction = {
          type: "EndTurn",
          playerId: "1",
        };

        expect(
          AvailableActionsStateEngine.validateAction(action, gameState)
        ).toBeFalsy();
      });
    });
  });
});
