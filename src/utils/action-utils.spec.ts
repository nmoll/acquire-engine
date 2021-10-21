import { HotelChainType } from "../model";
import { PlayerAction } from "../model/player-action";
import { ActionUtils } from "./action-utils";

describe("ActionUtils", () => {
  describe(ActionUtils.getCurrentTurn.name, () => {
    it("should return empty list if no actions", () => {
      const actions: PlayerAction[] = [];
      expect(ActionUtils.getCurrentTurn(actions)).toEqual([]);
    });

    it("should return empty list if last action is EndTurn", () => {
      const actions: PlayerAction[] = [
        {
          type: "PlaceTile",
          playerId: "1",
          boardSquareId: 1,
        },
        {
          type: "EndTurn",
          playerId: "1",
        },
      ];
      expect(ActionUtils.getCurrentTurn(actions)).toEqual([]);
    });

    it("should return all actions for the current turn", () => {
      const actions: PlayerAction[] = [
        {
          type: "PlaceTile",
          playerId: "1",
          boardSquareId: 1,
        },
        {
          type: "EndTurn",
          playerId: "1",
        },
        {
          type: "PlaceTile",
          playerId: "2",
          boardSquareId: 5,
        },
        {
          type: "StartHotelChain",
          playerId: "2",
          hotelChain: HotelChainType.AMERICAN,
        },
        {
          type: "EndTurn",
          playerId: "2",
        },
        {
          type: "PlaceTile",
          playerId: "3",
          boardSquareId: 2,
        },
        {
          type: "PurchaseShares",
          playerId: "3",
          hotelChain: HotelChainType.AMERICAN,
        },
      ];

      expect(ActionUtils.getCurrentTurn(actions)).toEqual([
        {
          type: "PlaceTile",
          playerId: "3",
          boardSquareId: 2,
        },
        {
          type: "PurchaseShares",
          playerId: "3",
          hotelChain: HotelChainType.AMERICAN,
        },
      ]);
    });
  });
});
