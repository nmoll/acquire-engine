import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerActionResult } from "../../model/player-action-result";
import { createGameInstance } from "../../test/factory/game-instance.factory";
import { CurrentPlayerIdStateEngine } from "./current-player-id-state-engine";

describe("CurrentPlayerIdStateEngine", () => {
  describe("computeState", () => {
    const PLAYER_1 = "2";
    const PLAYER_2 = "5";
    const PLAYER_3 = "1";
    const PLAYER_4 = "7";
    let playerIds: string[];
    let gameInstance: IAcquireGameInstance;

    beforeEach(() => {
      playerIds = [PLAYER_1, PLAYER_2, PLAYER_3, PLAYER_4];
      gameInstance = createGameInstance({
        randomSeed: 1,
        playerIds,
      });
    });

    it("should return null if no player ids", () => {
      const gameWithNoPlayers: IAcquireGameInstance = createGameInstance({
        randomSeed: 1,
        playerIds: [],
      });
      expect(
        CurrentPlayerIdStateEngine.computeState(gameWithNoPlayers, null)
      ).toEqual(null);
    });

    it("should return the first player if no action played", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(gameInstance, null)
      ).toEqual(PLAYER_1);
    });

    it("should return current player id if tile is placed", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(
          gameInstance,
          PlayerActionResult.TilePlaced(PLAYER_1, 1)
        )
      ).toEqual(PLAYER_1);
    });

    it("should return current player id if hotel chain is started", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(
          gameInstance,
          PlayerActionResult.HotelChainStarted(PLAYER_2, "Imperial", [])
        )
      ).toEqual(PLAYER_2);
    });

    it("should return current player id if shares are purchased", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(
          gameInstance,
          PlayerActionResult.SharesPurchased(PLAYER_3, "American")
        )
      ).toEqual(PLAYER_3);
    });

    it("should return current player id if hotel chain is merged", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(
          gameInstance,
          PlayerActionResult.HotelAutoMerged(
            PLAYER_2,
            1,
            {
              hotelChain: "Tower",
              size: 2,
            },
            {
              hotelChain: "Luxor",
              size: 3,
            },
            {}
          ),
          {
            [PLAYER_2]: {
              Tower: 1,
            },
          }
        )
      ).toEqual(PLAYER_2);
    });

    it("should return the next player id if turn ends", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(
          gameInstance,
          PlayerActionResult.TurnEnded(PLAYER_2)
        )
      ).toEqual(PLAYER_3);
    });

    it("should return the first player id if last player turn ends", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(
          gameInstance,
          PlayerActionResult.TurnEnded(PLAYER_4)
        )
      ).toEqual(PLAYER_1);
    });
  });
});
