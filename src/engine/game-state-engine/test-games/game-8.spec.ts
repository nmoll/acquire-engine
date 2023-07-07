import { it } from "vitest";
import { IAcquireGameInstance } from "../../../model/acquire-game-instance";
import { PlayerAction } from "../../../model/player-action";
import { playAndRecordActions } from "../../../test/helpers";

it("Game Play", () => {
  playAndRecordActions(game.gameInstance, game.actions);
});

const game: {
  gameInstance: IAcquireGameInstance;
  actions: PlayerAction[];
} = {
  gameInstance: {
    id: "604USZ",
    randomSeed: 781,
    playerIds: ["8143_Rowan", "5031_Nate"],
    hostId: "8143_Rowan",
    state: "started",
  },
  actions: [
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 53,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 55,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 76,
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
      boardSquareId: 10,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 81,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 11,
    },
    {
      type: "StartHotelChain",
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
      boardSquareId: 40,
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
      boardSquareId: 5,
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
      boardSquareId: 39,
    },
    {
      type: "StartHotelChain",
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
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 6,
    },
    {
      type: "StartHotelChain",
      playerId: "8143_Rowan",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Continental",
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
      boardSquareId: 89,
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
      boardSquareId: 94,
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "American",
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
      boardSquareId: 45,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 59,
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Festival",
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
      boardSquareId: 75,
    },
    {
      type: "StartHotelChain",
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
      boardSquareId: 27,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 62,
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
      boardSquareId: 90,
    },
    {
      type: "StartHotelChain",
      playerId: "5031_Nate",
      hotelChain: "Imperial",
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
      boardSquareId: 71,
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
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 61,
    },
    {
      type: "StartHotelChain",
      playerId: "5031_Nate",
      hotelChain: "Tower",
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
      boardSquareId: 35,
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
      type: "Merge",
      playerId: "5031_Nate",
      hotelChainToKeep: "Imperial",
      hotelChainToDissolve: "Worldwide",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "5031_Nate",
      hotelChain: "Worldwide",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "KeepOrphanedShare",
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
      hotelChain: "Tower",
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
      boardSquareId: 106,
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
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 1,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Luxor",
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
      boardSquareId: 3,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 28,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Festival",
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
      boardSquareId: 92,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 42,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Luxor",
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
      boardSquareId: 60,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 100,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 52,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 14,
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
      boardSquareId: 54,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 48,
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
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 73,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 23,
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
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 98,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 79,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 12,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 84,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "8143_Rowan",
      boardSquareId: 49,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 58,
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Worldwide",
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
      boardSquareId: 46,
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 34,
    },
    {
      type: "SellOrphanedShare",
      playerId: "5031_Nate",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "8143_Rowan",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "5031_Nate",
      hotelChain: "Worldwide",
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
      boardSquareId: 102,
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
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "8143_Rowan",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 86,
    },
    {
      type: "StartHotelChain",
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
      boardSquareId: 74,
    },
    {
      type: "PurchaseShares",
      playerId: "8143_Rowan",
      hotelChain: "Tower",
    },
  ],
};
