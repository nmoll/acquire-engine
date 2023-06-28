import { it } from "vitest";
import { IAcquireGameInstance } from "../../../model/acquire-game-instance";
import { PlayerAction } from "../../../model/player-action";
import { playAndRecordActions } from "../../../test/helpers";

it("Game Play", () => {
  playAndRecordActions(gameInstance, actions);
});

const gameInstance: IAcquireGameInstance = {
  id: "2044336",
  randomSeed: 795,
  playerIds: ["1", "2"],
  hostId: "1",
  state: "started",
};

const actions: PlayerAction[] = [
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
    boardSquareId: 79,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 71,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 91,
  },
  {
    type: "StartHotelChain",
    playerId: "2",
    hotelChain: "American",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "American",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "American",
  },
  {
    type: "PurchaseShares",
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
    boardSquareId: 94,
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
    boardSquareId: 52,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "American",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "American",
  },
  {
    type: "PurchaseShares",
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
    boardSquareId: 95,
  },
  {
    type: "StartHotelChain",
    playerId: "1",
    hotelChain: "Luxor",
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
    boardSquareId: 19,
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
    boardSquareId: 4,
  },
  {
    type: "PurchaseShares",
    playerId: "1",
    hotelChain: "American",
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
    boardSquareId: 38,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "American",
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "American",
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
    boardSquareId: 49,
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
    boardSquareId: 34,
  },
  {
    type: "PurchaseShares",
    playerId: "2",
    hotelChain: "American",
  },
  {
    type: "PurchaseShares",
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
    boardSquareId: 17,
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
    boardSquareId: 92,
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
    boardSquareId: 45,
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
    boardSquareId: 35,
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
    boardSquareId: 67,
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
    boardSquareId: 8,
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
    boardSquareId: 5,
  },
  {
    type: "StartHotelChain",
    playerId: "1",
    hotelChain: "Worldwide",
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
    boardSquareId: 54,
  },
  {
    type: "StartHotelChain",
    playerId: "2",
    hotelChain: "Festival",
  },
  {
    type: "PurchaseShares",
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
    boardSquareId: 7,
  },
  {
    type: "StartHotelChain",
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
    boardSquareId: 56,
  },
  {
    type: "EndTurn",
    playerId: "2",
  },
  {
    type: "PlaceTile",
    playerId: "1",
    boardSquareId: 89,
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 46,
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
    playerId: "2",
    hotelChain: "Festival",
    hotelChainToReceive: "American",
  },
  {
    type: "EndTurn",
    playerId: "1",
  },
  {
    type: "PlaceTile",
    playerId: "2",
    boardSquareId: 100,
  },
];
