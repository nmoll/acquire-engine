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
    id: "1325283",
    randomSeed: 559,
    playerIds: ["3658_Nate", "5975_Joe"],
    hostId: "3658_Nate",
    state: "started",
  },
  actions: [
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 55,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 93,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 26,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 94,
    },
    {
      type: "StartHotelChain",
      playerId: "5975_Joe",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5975_Joe",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5975_Joe",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5975_Joe",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 38,
    },
    {
      type: "StartHotelChain",
      playerId: "3658_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 41,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 17,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 61,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 60,
    },
    {
      type: "StartHotelChain",
      playerId: "3658_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 21,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 54,
    },
    {
      type: "StartHotelChain",
      playerId: "3658_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 77,
    },
    {
      type: "PurchaseShares",
      playerId: "5975_Joe",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "5975_Joe",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5975_Joe",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 102,
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 39,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 101,
    },
    {
      type: "StartHotelChain",
      playerId: "3658_Nate",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 70,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 32,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 24,
    },
    {
      type: "PurchaseShares",
      playerId: "5975_Joe",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "5975_Joe",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "5975_Joe",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 31,
    },
    {
      type: "StartHotelChain",
      playerId: "3658_Nate",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 71,
    },
    {
      type: "StartHotelChain",
      playerId: "5975_Joe",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 40,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 67,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 92,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 100,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 80,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 75,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 4,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 50,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 57,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 73,
    },
    {
      type: "PurchaseShares",
      playerId: "5975_Joe",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "5975_Joe",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "5975_Joe",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 59,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 42,
    },
    {
      type: "TradeOrphanedShare",
      playerId: "5975_Joe",
      hotelChain: "Worldwide",
      hotelChainToReceive: "Festival",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "3658_Nate",
      hotelChain: "Worldwide",
      hotelChainToReceive: "Festival",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "3658_Nate",
      hotelChain: "Worldwide",
      hotelChainToReceive: "Festival",
    },
    {
      type: "SellOrphanedShare",
      playerId: "3658_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 88,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 91,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 63,
    },
    {
      type: "StartHotelChain",
      playerId: "3658_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "3658_Nate",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 106,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 8,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 90,
    },
    {
      type: "TradeOrphanedShare",
      playerId: "5975_Joe",
      hotelChain: "Luxor",
      hotelChainToReceive: "Continental",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "3658_Nate",
      hotelChain: "Luxor",
      hotelChainToReceive: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 2,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 49,
    },
    {
      type: "TradeOrphanedShare",
      playerId: "3658_Nate",
      hotelChain: "Imperial",
      hotelChainToReceive: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 96,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 87,
    },
    {
      type: "SellOrphanedShare",
      playerId: "3658_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "SellOrphanedShare",
      playerId: "3658_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 44,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 58,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 76,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 30,
    },
    {
      type: "TradeOrphanedShare",
      playerId: "3658_Nate",
      hotelChain: "Tower",
      hotelChainToReceive: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 78,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 46,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 81,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 104,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 37,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 25,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 35,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 10,
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 64,
    },
    {
      type: "EndTurn",
      playerId: "3658_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "5975_Joe",
      boardSquareId: 69,
    },
    {
      type: "TradeOrphanedShare",
      playerId: "5975_Joe",
      hotelChain: "American",
      hotelChainToReceive: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "5975_Joe",
    },
    {
      type: "PlaceTile",
      playerId: "3658_Nate",
      boardSquareId: 72,
    },
  ],
};
