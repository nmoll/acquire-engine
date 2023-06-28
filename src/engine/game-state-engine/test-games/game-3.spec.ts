import { it } from "vitest";
import { IAcquireGameInstance } from "../../../model/acquire-game-instance";
import { PlayerAction, PlayerActionType } from "../../../model/player-action";
import { playAndRecordActions, tile } from "../../../test/helpers";

it("Game Play", () => {
  playAndRecordActions(gameInstance, actions);
});

const gameInstance: IAcquireGameInstance = {
  id: "2850342",
  randomSeed: 777,
  playerIds: ["1", "2"],
  hostId: "1",
  state: "started",
};

const actions: PlayerAction[] = [
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 81,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 57,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 106,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 62,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 79,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 78,
  },
  {
    type: "StartHotelChain",
    playerId: "2",
    hotelChain: "Tower",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Tower",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Tower",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 38,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Tower",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Tower",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Tower",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 90,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Tower",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Tower",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Tower",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 85,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 105,
  },
  {
    type: "StartHotelChain",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 56,
  },
  {
    type: "StartHotelChain",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 66,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Tower",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Tower",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Tower",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 97,
  },
  {
    type: "StartHotelChain",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 43,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 18,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 17,
  },
  {
    type: "StartHotelChain",
    playerId: "2",
    hotelChain: "Luxor",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Luxor",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Luxor",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 101,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 32,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 104,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 77,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Luxor",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 54,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 89,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 107,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 52,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 15,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 98,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 33,
  },
  {
    type: "StartHotelChain",
    playerId: "1",
    hotelChain: "Festival",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 67,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 19,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 23,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 73,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 72,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 55,
  },
  {
    type: "TradeOrphanedShare",
    playerId: "1",
    hotelChain: "Continental",
    hotelChainToReceive: "Tower",
  },
  {
    type: "TradeOrphanedShare",
    playerId: "1",
    hotelChain: "Continental",
    hotelChainToReceive: "Tower",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Festival",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Festival",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Festival",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 45,
  },
  {
    type: "TradeOrphanedShare",
    playerId: "1",
    hotelChain: "Festival",
    hotelChainToReceive: "Tower",
  },
  {
    type: "TradeOrphanedShare",
    playerId: "1",
    hotelChain: "Festival",
    hotelChainToReceive: "Tower",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 102,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Tower",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Tower",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Tower",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 80,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 22,
  },
  {
    type: "StartHotelChain",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 70,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 46,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 64,
  },
  {
    type: "StartHotelChain",
    playerId: "2",
    hotelChain: "American",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 5,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 11,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 40,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "American",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "American",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "American",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 87,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 44,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "American",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 37,
  },
  {
    type: "StartHotelChain",
    playerId: "2",
    hotelChain: "Festival",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 14,
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 100,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Festival",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Festival",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Festival",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 36,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 30,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Tower",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 26,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 83,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 69,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 58,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 35,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 99,
  },
  {
    type: "TradeOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
    hotelChainToReceive: "Tower",
  },
  {
    type: "TradeOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
    hotelChainToReceive: "Tower",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "TradeOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
    hotelChainToReceive: "Tower",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Tower",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "American",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 53,
  },
  {
    type: "KeepOrphanedShare",
    playerId: "2",
    hotelChain: "American",
  },
  {
    type: "TradeOrphanedShare",
    playerId: "1",
    hotelChain: "American",
    hotelChainToReceive: "Tower",
  },
  {
    type: "TradeOrphanedShare",
    playerId: "1",
    hotelChain: "American",
    hotelChainToReceive: "Tower",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "American",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 16,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Festival",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Festival",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Festival",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 41,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 14,
  },
  {
    type: "TradeOrphanedShare",
    playerId: "1",
    hotelChain: "Festival",
    hotelChainToReceive: "Luxor",
  },
  {
    type: "TradeOrphanedShare",
    playerId: "1",
    hotelChain: "Festival",
    hotelChainToReceive: "Luxor",
  },
  {
    type: "TradeOrphanedShare",
    playerId: "1",
    hotelChain: "Festival",
    hotelChainToReceive: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Festival",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 28,
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Luxor",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Continental",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 63,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 71,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Continental",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 95,
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 47,
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Continental",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Continental",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Continental",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Continental",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 29,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 6,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 27,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 50,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 9,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 49,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 42,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 2,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 59,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 93,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 34,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 88,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 91,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 31,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 4,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 8,
  },
  {
    type: "StartHotelChain",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 94,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 92,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 84,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 96,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 86,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 51,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 103,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 48,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 7,
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "1",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2",
    hotelChain: "Worldwide",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 13,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 10,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 68,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 82,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 61,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 21,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 65,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 76,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 20,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 75,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 74,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 60,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  PlayerActionType.PlaceTile("2", tile("1A")),
  PlayerActionType.EndTurn("2"),
  PlayerActionType.PlaceTile("1", tile("1B")),
  PlayerActionType.EndTurn("1"),
  PlayerActionType.PlaceTile("2", tile("1C")),
  PlayerActionType.EndTurn("2"),
  PlayerActionType.PlaceTile("1", tile("4D")),
  PlayerActionType.EndTurn("1"),
  PlayerActionType.PlaceTile("2", tile("2A")),
  PlayerActionType.EndTurn("2"),
  PlayerActionType.PlaceTile("1", tile("4A")),
  PlayerActionType.EndTurn("1"),
  PlayerActionType.PlaceTile("2", tile("2C")),
  PlayerActionType.EndTurn("2"),
];
