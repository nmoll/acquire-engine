import { it } from "vitest";
import { IAcquireGameInstance } from "../../../model/acquire-game-instance";
import { PlayerAction } from "../../../model/player-action";
import { playAndRecordActions } from "../../../test/helpers";

/**
 * This tests:
 *  - Dead chips are replaced when turn is ended
 */
it("Game Play", () => {
  playAndRecordActions(game.gameInstance, game.actions);
});

const game: {
  gameInstance: IAcquireGameInstance;
  actions: PlayerAction[];
} = {
  gameInstance: {
    id: "325JNW",
    randomSeed: 796,
    playerIds: ["8143_Rowan", "5031_Nate"],
    hostId: "8143_Rowan",
    state: "started",
  },
  actions: [
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 39,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 77,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 33,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 16,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 44,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 41,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 5,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 70,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 57,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 65,
    },
    {
      type: "StartHotelChain",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 61,
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 82,
    },
    {
      type: "StartHotelChain",
      playerId: "5031_Nate",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 43,
    },
    {
      type: "StartHotelChain",
      playerId: "8143_Rowan",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 40,
    },
    {
      type: "StartHotelChain",
      playerId: "5031_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 45,
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 2,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 7,
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 96,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 19,
    },
    {
      type: "StartHotelChain",
      playerId: "8143_Rowan",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 72,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 84,
    },
    {
      type: "StartHotelChain",
      playerId: "8143_Rowan",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 6,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 69,
    },
    {
      type: "TradeOrphanedShare",
      playerId: "5031_Nate",
      hotelChain: "Continental",
      hotelChainToReceive: "Tower",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "5031_Nate",
      hotelChain: "Continental",
      hotelChainToReceive: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 24,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 78,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 15,
    },
    {
      type: "StartHotelChain",
      playerId: "5031_Nate",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 87,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 35,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 86,
    },
    {
      type: "StartHotelChain",
      playerId: "8143_Rowan",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 54,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 95,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 8,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 83,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 104,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 31,
    },
    {
      type: "SellOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "Worldwide",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "5031_Nate",
      hotelChain: "Worldwide",
      hotelChainToReceive: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Imperial",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 0,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 9,
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 99,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 92,
    },
    {
      type: "StartHotelChain",
      playerId: "8143_Rowan",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 50,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 63,
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 89,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 13,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 38,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 94,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 32,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 4,
    },
    {
      type: "SellOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "Continental",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "5031_Nate",
      hotelChain: "Continental",
      hotelChainToReceive: "Tower",
    },
    {
      type: "SellOrphanedShare",
      playerId: "5031_Nate",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 23,
    },
    {
      type: "StartHotelChain",
      playerId: "5031_Nate",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 85,
    },
    {
      type: "Merge",
      playerId: "8143_Rowan",
      survivor: "Festival",
      dissolve: ["Luxor"],
    },
    {
      type: "TradeOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "Luxor",
      hotelChainToReceive: "Festival",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "Luxor",
      hotelChainToReceive: "Festival",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "5031_Nate",
      hotelChain: "Luxor",
      hotelChainToReceive: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 66,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 25,
    },
    {
      type: "StartHotelChain",
      playerId: "8143_Rowan",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 11,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 97,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 49,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 60,
    },
    {
      type: "TradeOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "Imperial",
      hotelChainToReceive: "Festival",
    },
    {
      type: "SellOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "Imperial",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "5031_Nate",
      hotelChain: "Imperial",
      hotelChainToReceive: "Festival",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "5031_Nate",
      hotelChain: "Imperial",
      hotelChainToReceive: "Festival",
    },
    {
      type: "SellOrphanedShare",
      playerId: "5031_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
  ],
};
