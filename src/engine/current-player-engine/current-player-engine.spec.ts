import { CurrentPlayerEngine } from "./curent-player-engine";
import { PlayerActionType } from "../../model/player-action";
import { HotelChainType } from "../../model";

describe("CurrentPlayerEngine", () => {
  describe("computeState", () => {
    const PLAYER_1 = 2;
    const PLAYER_2 = 5;
    const PLAYER_3 = 1;
    const PLAYER_4 = 7;
    let playerIds: number[];

    beforeEach(() => {
      playerIds = [PLAYER_1, PLAYER_2, PLAYER_3, PLAYER_4];
    });

    it("should return null if no player ids", () => {
      expect(CurrentPlayerEngine.computeState([], null)).toBeNull();
    });

    it("should return current player id if PlaceTile action is played", () => {
      expect(
        CurrentPlayerEngine.computeState(
          playerIds,
          PlayerActionType.PlaceTile(PLAYER_1, 1)
        )
      ).toBe(PLAYER_1);
    });

    it("should return current player id if StartHotelChain action is played", () => {
      expect(
        CurrentPlayerEngine.computeState(
          playerIds,
          PlayerActionType.StartHotelChain(PLAYER_2, HotelChainType.IMPERIAL)
        )
      ).toBe(PLAYER_2);
    });

    it("should return current player id if PurchaseShares action is played", () => {
      expect(
        CurrentPlayerEngine.computeState(
          playerIds,
          PlayerActionType.PurchaseShares(PLAYER_3, [])
        )
      ).toBe(PLAYER_3);
    });

    it("should return current player id if ChooseMergeDirection action is played", () => {
      expect(
        CurrentPlayerEngine.computeState(
          playerIds,
          PlayerActionType.ChooseMergeDirection(PLAYER_2, HotelChainType.TOWER)
        )
      ).toBe(PLAYER_2);
    });

    it("should return the next player id if EndTurn action is played", () => {
      expect(
        CurrentPlayerEngine.computeState(
          playerIds,
          PlayerActionType.EndTurn(PLAYER_2)
        )
      ).toBe(PLAYER_3);
    });

    it("should return the first player id if EndTurn action is played by the last player", () => {
      expect(
        CurrentPlayerEngine.computeState(
          playerIds,
          PlayerActionType.EndTurn(PLAYER_4)
        )
      ).toBe(PLAYER_1);
    });
  });
});
