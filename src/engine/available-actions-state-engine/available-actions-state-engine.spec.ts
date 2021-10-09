import { BoardSquareState, HotelChainType, ISharesState } from "../../model";
import { AvailableAction } from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";
import { CurrentPlayerIdState } from "../../model/current-player-id-state";
import { PlayerAction, PlayerActionType } from "../../model/player-action";
import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { createGameState } from "../../test/factory/game-state.factory";
import { SharesStateFactory } from "../../test/factory/shares-state.factory";
import { BoardStateEngine } from "../board-state-engine/board-state-engine";
import { AvailableActionsStateEngine } from "./available-actions-state-engine";

describe("AvailableActionsStateEngine", () => {
  describe(AvailableActionsStateEngine.computeState.name, () => {
    it("should be 'ChooseTile' action is null", () => {
      const boardState = BoardStateEngine.computeState();
      const sharesState = SharesStateFactory.createSharesState(``);

      const expected: IAvailableActionState = [
        {
          type: "ChooseTile",
        },
      ];

      expect(
        AvailableActionsStateEngine.computeState(boardState, sharesState)
      ).toEqual(expected);
    });

    it("should be 'ChooseTile' action if the last action was EndTurn", () => {
      const boardState = BoardStateEngine.computeState();
      const sharesState = SharesStateFactory.createSharesState(``);

      const action: PlayerAction = {
        type: "EndTurn",
        playerId: 2,
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

      const action: PlayerAction = {
        type: "PlaceTile",
        playerId: 1,
        boardSquareId: 0,
      };

      const expected: AvailableAction[] = [
        {
          type: "ChooseHotelChain",
          hotelChains: [
            HotelChainType.CONTINENTAL,
            HotelChainType.FESTIVAL,
            HotelChainType.IMPERIAL,
            HotelChainType.LUXOR,
          ],
        },
      ];

      expect(
        AvailableActionsStateEngine.computeState(
          boardState,
          sharesState,
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
          playerId: 1,
          boardSquareId: 6,
        };

        expect(
          AvailableActionsStateEngine.computeState(
            boardState,
            sharesState,
            action
          )
        ).toEqual([
          {
            type: "ChooseShares",
            availableShares: {
              FESTIVAL: 3,
              AMERICAN: 2,
              WORLDWIDE: 0,
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
          playerId: 1,
          hotelChain: HotelChainType.FESTIVAL,
        };

        expect(
          AvailableActionsStateEngine.computeState(
            boardState,
            sharesState,
            action
          )
        ).toEqual([
          {
            type: "ChooseShares",
            availableShares: {
              FESTIVAL: 3,
              AMERICAN: 2,
              WORLDWIDE: 0,
            },
          },
          {
            type: "ChooseEndTurn",
          },
        ]);
      });

      it("should not be available after PurchaseShares action", () => {
        const action: PlayerAction = {
          type: "PurchaseShares",
          playerId: 1,
          shares: [
            {
              hotel: HotelChainType.FESTIVAL,
              quantity: 3,
            },
          ],
        };

        expect(
          AvailableActionsStateEngine.computeState(
            boardState,
            sharesState,
            action
          )
        ).toEqual([
          {
            type: "ChooseEndTurn",
          },
        ]);
      });

      it("should not be available after EndTurn", () => {
        const action: PlayerAction = {
          type: "EndTurn",
          playerId: 1,
        };

        expect(
          AvailableActionsStateEngine.computeState(
            boardState,
            sharesState,
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

      const action: PlayerAction = {
        type: "PlaceTile",
        playerId: 1,
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
          action
        )
      ).toEqual(expected);
    });
  });

  describe(AvailableActionsStateEngine.validateAction.name, () => {
    const currentPlayerIdState: CurrentPlayerIdState = 1;

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
          playerId: 1,
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
          playerId: 2,
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
          playerId: 1,
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
              hotelChains: [
                HotelChainType.CONTINENTAL,
                HotelChainType.AMERICAN,
                HotelChainType.FESTIVAL,
              ],
            },
          ],
        });
        const action: PlayerAction = {
          type: "StartHotelChain",
          playerId: 1,
          hotelChain: HotelChainType.AMERICAN,
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
              hotelChains: [
                HotelChainType.CONTINENTAL,
                HotelChainType.FESTIVAL,
              ],
            },
          ],
        });
        const action: PlayerAction = {
          type: "StartHotelChain",
          playerId: 1,
          hotelChain: HotelChainType.AMERICAN,
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
          playerId: 1,
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
          playerId: 1,
        };

        expect(
          AvailableActionsStateEngine.validateAction(action, gameState)
        ).toBeFalsy();
      });
    });
  });
});
