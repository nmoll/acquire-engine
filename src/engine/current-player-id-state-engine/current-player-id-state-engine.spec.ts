import { HotelChainType } from "../../model";
import { PlayerActionType } from "../../model/player-action";
import { CurrentPlayerIdStateEngine } from "./current-player-id-state-engine";

describe("CurrentPlayerIdStateEngine", () => {
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
      expect(CurrentPlayerIdStateEngine.computeState([], null)).toEqual(null);
    });

    it("should return current player id if PlaceTile action is played", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(
          playerIds,
          PlayerActionType.PlaceTile(PLAYER_1, 1)
        )
      ).toEqual(PLAYER_1);
    });

    it("should return current player id if StartHotelChain action is played", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(
          playerIds,
          PlayerActionType.StartHotelChain(PLAYER_2, HotelChainType.IMPERIAL)
        )
      ).toEqual(PLAYER_2);
    });

    it("should return current player id if PurchaseShares action is played", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(
          playerIds,
          PlayerActionType.PurchaseShares(PLAYER_3, [])
        )
      ).toEqual(PLAYER_3);
    });

    it("should return current player id if ChooseMergeDirection action is played", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(
          playerIds,
          PlayerActionType.ChooseMergeDirection(PLAYER_2, HotelChainType.TOWER)
        )
      ).toEqual(PLAYER_2);
    });

    it("should return the next player id if EndTurn action is played", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(
          playerIds,
          PlayerActionType.EndTurn(PLAYER_2)
        )
      ).toEqual(PLAYER_3);
    });

    it("should return the first player id if EndTurn action is played by the last player", () => {
      expect(
        CurrentPlayerIdStateEngine.computeState(
          playerIds,
          PlayerActionType.EndTurn(PLAYER_4)
        )
      ).toEqual(PLAYER_1);
    });
  });
});
