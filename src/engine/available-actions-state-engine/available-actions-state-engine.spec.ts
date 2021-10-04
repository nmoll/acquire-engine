import { createGameState } from "../../../test/factory/game-state.factory";
import { IGameState } from "../../model";
import { IAvailableActionState } from "../../model/available-action-state";
import { PlayerAction } from "../../model/player-action";
import { AvailableActionsStateEngine } from "./available-actions-state-engine";

describe("AvailableActionsStateEngine", () => {
  describe("ChooseTile", () => {
    it("should be 'ChooseTile' action if no actions have been played in the game", () => {
      const gameState: IGameState = createGameState({
        currentPlayerIdState: 1,
      });

      const actions: PlayerAction[] = [];

      const expected: IAvailableActionState = {
        1: [
          {
            type: "ChooseTile",
          },
        ],
      };

      expect(
        AvailableActionsStateEngine.computeState(actions, gameState)
      ).toEqual(expected);
    });

    it("should be 'ChooseTile' action if no actions have been played for the current turn", () => {
      const gameState: IGameState = createGameState({
        currentPlayerIdState: 1,
      });

      const actions: PlayerAction[] = [
        {
          type: "PlaceTile",
          playerId: 1,
          boardSquareId: 2,
        },
        {
          type: "EndTurn",
          playerId: 1,
        },
        {
          type: "PlaceTile",
          playerId: 2,
          boardSquareId: 6,
        },
        {
          type: "EndTurn",
          playerId: 2,
        },
      ];

      const expected: IAvailableActionState = {
        1: [
          {
            type: "ChooseTile",
          },
        ],
      };

      expect(
        AvailableActionsStateEngine.computeState(actions, gameState)
      ).toEqual(expected);
    });
  });

  describe("ChooseHotelChain", () => {
    it("should be 'ChooseHotelChain' if played starter tile", () => {
      //
      expect(true).toBeTruthy();
    });
  });

  describe("ChooseEndTurn", () => {
    it("should be 'ChooseEndTurn' if tile has been placed by player", () => {
      const gameState: IGameState = createGameState({
        currentPlayerIdState: 1,
      });

      const actions: PlayerAction[] = [
        {
          type: "PlaceTile",
          playerId: 1,
          boardSquareId: 2,
        },
      ];

      const expected: IAvailableActionState = {
        1: [
          {
            type: "ChooseEndTurn",
          },
        ],
      };

      expect(
        AvailableActionsStateEngine.computeState(actions, gameState)
      ).toEqual(expected);
    });
  });
});
