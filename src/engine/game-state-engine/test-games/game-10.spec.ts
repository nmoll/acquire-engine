import { it } from "vitest";
import { playAndRecordActions } from "../../../test/helpers";
import { IAcquireGameInstance } from "../../../model/acquire-game-instance";
import { PlayerAction } from "../../../model/player-action";

it("Game Play", () => {
  playAndRecordActions(game.gameInstance, game.actions);
});

const game: {
  gameInstance: IAcquireGameInstance;
  actions: PlayerAction[];
} = {
  gameInstance: {
    id: "862MOF",
    randomSeed: 484,
    playerIds: ["2117_Lance", "4927_Jake", "9712_Nate"],
    hostId: "2117_Lance",
    state: "started",
  },
  actions: [
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 12,
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 89,
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 16,
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 60,
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 61,
    },
    {
      type: "StartHotelChain",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 28,
    },
    {
      type: "StartHotelChain",
      playerId: "9712_Nate",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 94,
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 87,
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 23,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 1,
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 18,
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 70,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 93,
    },
    {
      type: "StartHotelChain",
      playerId: "2117_Lance",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 58,
    },
    {
      type: "StartHotelChain",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 2,
    },
    {
      type: "StartHotelChain",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 79,
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 99,
    },
    {
      type: "StartHotelChain",
      playerId: "4927_Jake",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 91,
    },
    {
      type: "StartHotelChain",
      playerId: "9712_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 9,
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 36,
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 13,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 34,
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 55,
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 51,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 42,
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 102,
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 38,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 83,
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 5,
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 68,
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 92,
    },
    {
      type: "Merge",
      playerId: "2117_Lance",
      survivor: "Imperial",
      dissolve: ["Luxor"],
    },
    {
      type: "TradeOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Luxor",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Luxor",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 19,
    },
    {
      type: "StartHotelChain",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 80,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 71,
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 7,
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 98,
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 4,
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 17,
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 69,
    },
    {
      type: "TradeOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "Festival",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "Festival",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "Festival",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "Festival",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Festival",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Festival",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Festival",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Festival",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Festival",
      hotelChainToReceive: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 43,
    },
    {
      type: "StartHotelChain",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 10,
    },
    {
      type: "StartHotelChain",
      playerId: "4927_Jake",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Imperial",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 82,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 31,
    },
    {
      type: "TradeOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
      hotelChainToReceive: "Tower",
    },
    {
      type: "TradeOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
      hotelChainToReceive: "Tower",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 63,
    },
    {
      type: "StartHotelChain",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 41,
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 39,
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 24,
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 95,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 40,
    },
    {
      type: "TradeOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
      hotelChainToReceive: "Tower",
    },
    {
      type: "SellOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "KeepOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 3,
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 104,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 52,
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 74,
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 37,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 46,
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 73,
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 20,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 44,
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 101,
    },
    {
      type: "StartHotelChain",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 11,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 96,
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 32,
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 62,
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "9712_Nate",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "SellOrphanedShare",
      playerId: "4927_Jake",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 84,
    },
    {
      type: "StartHotelChain",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 30,
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "4927_Jake",
    },
    {
      type: "PlaceTile",
      playerId: "9712_Nate",
      boardSquareId: 6,
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "9712_Nate",
      hotelChain: "Worldwide",
    },
    {
      type: "EndTurn",
      playerId: "9712_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "2117_Lance",
      boardSquareId: 85,
    },
    {
      type: "SellOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "SellOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "SellOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "SellOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "SellOrphanedShare",
      playerId: "2117_Lance",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "2117_Lance",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "2117_Lance",
    },
    {
      type: "PlaceTile",
      playerId: "4927_Jake",
      boardSquareId: 29,
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "4927_Jake",
      hotelChain: "Worldwide",
    },
    {
      type: "EndGame",
      playerId: "4927_Jake",
    },
  ],
};
