import { HotelChainType } from "../../model";
import { AvailableAction } from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";
import { CurrentPlayerIdState } from "../../model/current-player-id-state";
import { PlayerAction, PlayerActionType } from "../../model/player-action";
import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { BoardStateEngine } from "../board-state-engine/board-state-engine";
import { AvailableActionsStateEngine } from "./available-actions-state-engine";

describe("AvailableActionsStateEngine", () => {
  describe(AvailableActionsStateEngine.computeState.name, () => {
    it("should be 'ChooseTile' action is null", () => {
      const boardState = BoardStateEngine.computeState();

      const expected: IAvailableActionState = [
        {
          type: "ChooseTile",
        },
      ];

      expect(AvailableActionsStateEngine.computeState(boardState)).toEqual(
        expected
      );
    });

    it("should be 'ChooseTile' action if the last action was EndTurn", () => {
      const boardState = BoardStateEngine.computeState();
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
        AvailableActionsStateEngine.computeState(boardState, action)
      ).toEqual(expected);
    });

    it("should be 'ChooseHotelChain' with inactive hotels if played starter tile", () => {
      const boardState = BoardStateFactory.createBoardState(`
          - 0 - - A A - 
          - - T T - - - 
          0 - T - - W W 
        `);
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
        AvailableActionsStateEngine.computeState(boardState, action)
      ).toEqual(expected);
    });

    it("should be 'ChooseEndTurn' if tile has been placed by player", () => {
      const boardState = BoardStateEngine.computeState();
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
        AvailableActionsStateEngine.computeState(boardState, action)
      ).toEqual(expected);
    });
  });

  describe(AvailableActionsStateEngine.validateAction.name, () => {
    const currentPlayerIdState: CurrentPlayerIdState = 1;

    describe(PlayerActionType.PlaceTile, () => {
      it("should return true if action is available", () => {
        const action: PlayerAction = {
          type: "PlaceTile",
          playerId: 1,
          boardSquareId: 1,
        };
        const available: IAvailableActionState = [
          {
            type: "ChooseTile",
          },
        ];

        expect(
          AvailableActionsStateEngine.validateAction(
            action,
            available,
            currentPlayerIdState
          )
        ).toBeTruthy();
      });

      it("should return false if action isnt by current player", () => {
        const action: PlayerAction = {
          type: "PlaceTile",
          playerId: 2,
          boardSquareId: 1,
        };
        const available: IAvailableActionState = [
          {
            type: "ChooseTile",
          },
        ];

        expect(
          AvailableActionsStateEngine.validateAction(
            action,
            available,
            currentPlayerIdState
          )
        ).toBeFalsy();
      });

      it("should return false if action is not available", () => {
        const action: PlayerAction = {
          type: "PlaceTile",
          playerId: 1,
          boardSquareId: 1,
        };
        const available: IAvailableActionState = [
          {
            type: "ChooseEndTurn",
          },
        ];

        expect(
          AvailableActionsStateEngine.validateAction(
            action,
            available,
            currentPlayerIdState
          )
        ).toBeFalsy();
      });
    });

    describe(PlayerActionType.StartHotelChain.name, () => {
      it("should return true if action is available for the given hotel", () => {
        const action: PlayerAction = {
          type: "StartHotelChain",
          playerId: 1,
          hotelChain: HotelChainType.AMERICAN,
        };
        const available: IAvailableActionState = [
          {
            type: "ChooseHotelChain",
            hotelChains: [
              HotelChainType.CONTINENTAL,
              HotelChainType.AMERICAN,
              HotelChainType.FESTIVAL,
            ],
          },
        ];

        expect(
          AvailableActionsStateEngine.validateAction(
            action,
            available,
            currentPlayerIdState
          )
        ).toBeTruthy();
      });

      it("should return false if hotel chain is not available", () => {
        const action: PlayerAction = {
          type: "StartHotelChain",
          playerId: 1,
          hotelChain: HotelChainType.AMERICAN,
        };
        const available: IAvailableActionState = [
          {
            type: "ChooseHotelChain",
            hotelChains: [HotelChainType.CONTINENTAL, HotelChainType.FESTIVAL],
          },
        ];

        expect(
          AvailableActionsStateEngine.validateAction(
            action,
            available,
            currentPlayerIdState
          )
        ).toBeFalsy();
      });
    });

    describe(PlayerActionType.EndTurn.name, () => {
      it("should return true if action is available", () => {
        const action: PlayerAction = {
          type: "EndTurn",
          playerId: 1,
        };
        const available: IAvailableActionState = [
          {
            type: "ChooseEndTurn",
          },
        ];

        expect(
          AvailableActionsStateEngine.validateAction(
            action,
            available,
            currentPlayerIdState
          )
        ).toBeTruthy();
      });

      it("should return false if action is not available", () => {
        const action: PlayerAction = {
          type: "EndTurn",
          playerId: 1,
        };
        const available: IAvailableActionState = [
          {
            type: "ChooseTile",
          },
        ];

        expect(
          AvailableActionsStateEngine.validateAction(
            action,
            available,
            currentPlayerIdState
          )
        ).toBeFalsy();
      });
    });
  });
});
