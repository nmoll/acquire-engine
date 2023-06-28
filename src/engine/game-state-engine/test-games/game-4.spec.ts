import { it } from "vitest";
import { IAcquireGameInstance } from "../../../model/acquire-game-instance";
import { PlayerAction } from "../../../model/player-action";
import { playAndRecordActions } from "../../../test/helpers";

it("Game Play", () => {
  playAndRecordActions(gameInstance, actions);
});

const gameInstance: IAcquireGameInstance = {
  id: "234540",
  randomSeed: 747,
  playerIds: ["2427_Rose", "5031_Nate"],
  hostId: "2427_Rose",
  state: "started",
};

const actions: PlayerAction[] = [
  {
    type: "PlaceTile",
    playerId: "2427_Rose",
    boardSquareId: 79,
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
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
    playerId: "2427_Rose",
    boardSquareId: 51,
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
  },
  {
    type: "PlaceTile",
    playerId: "5031_Nate",
    boardSquareId: 39,
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
    playerId: "2427_Rose",
    boardSquareId: 56,
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "American",
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
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
    playerId: "2427_Rose",
    boardSquareId: 78,
  },
  {
    type: "StartHotelChain",
    playerId: "2427_Rose",
    hotelChain: "Festival",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Festival",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Festival",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Festival",
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
  },
  {
    type: "PlaceTile",
    playerId: "5031_Nate",
    boardSquareId: 46,
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
    playerId: "2427_Rose",
    boardSquareId: 70,
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Festival",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "American",
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
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
    playerId: "2427_Rose",
    boardSquareId: 4,
  },
  {
    type: "StartHotelChain",
    playerId: "2427_Rose",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Continental",
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
  },
  {
    type: "PlaceTile",
    playerId: "5031_Nate",
    boardSquareId: 86,
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
    playerId: "2427_Rose",
    boardSquareId: 98,
  },
  {
    type: "StartHotelChain",
    playerId: "2427_Rose",
    hotelChain: "Luxor",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Luxor",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Festival",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "American",
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
  },
  {
    type: "PlaceTile",
    playerId: "5031_Nate",
    boardSquareId: 25,
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
    playerId: "2427_Rose",
    boardSquareId: 37,
  },
  {
    type: "StartHotelChain",
    playerId: "2427_Rose",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Imperial",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Imperial",
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
  },
  {
    type: "PlaceTile",
    playerId: "5031_Nate",
    boardSquareId: 105,
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
    playerId: "2427_Rose",
    boardSquareId: 58,
  },
  {
    type: "StartHotelChain",
    playerId: "2427_Rose",
    hotelChain: "Worldwide",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Continental",
  },
  {
    type: "PurchaseShares",
    playerId: "2427_Rose",
    hotelChain: "Imperial",
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
  },
  {
    type: "PlaceTile",
    playerId: "5031_Nate",
    boardSquareId: 21,
  },
  {
    type: "EndTurn",
    playerId: "5031_Nate",
  },
  {
    type: "PlaceTile",
    playerId: "2427_Rose",
    boardSquareId: 75,
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
  },
  {
    type: "PlaceTile",
    playerId: "5031_Nate",
    boardSquareId: 31,
  },
  {
    type: "EndTurn",
    playerId: "5031_Nate",
  },
  {
    type: "PlaceTile",
    playerId: "2427_Rose",
    boardSquareId: 22,
  },
  {
    type: "StartHotelChain",
    playerId: "2427_Rose",
    hotelChain: "Tower",
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
  },
  {
    type: "PlaceTile",
    playerId: "5031_Nate",
    boardSquareId: 103,
  },
  {
    type: "EndTurn",
    playerId: "5031_Nate",
  },
  {
    type: "PlaceTile",
    playerId: "2427_Rose",
    boardSquareId: 88,
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
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
    playerId: "2427_Rose",
    boardSquareId: 33,
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
  },
  {
    type: "PlaceTile",
    playerId: "5031_Nate",
    boardSquareId: 60,
  },
  {
    type: "EndTurn",
    playerId: "5031_Nate",
  },
  {
    type: "PlaceTile",
    playerId: "2427_Rose",
    boardSquareId: 94,
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
  },
  {
    type: "PlaceTile",
    playerId: "5031_Nate",
    boardSquareId: 64,
  },
  {
    type: "EndTurn",
    playerId: "5031_Nate",
  },
  {
    type: "PlaceTile",
    playerId: "2427_Rose",
    boardSquareId: 11,
  },
  {
    type: "EndTurn",
    playerId: "2427_Rose",
  },
  {
    type: "PlaceTile",
    playerId: "5031_Nate",
    boardSquareId: 15,
  },
  {
    type: "EndTurn",
    playerId: "5031_Nate",
  },
  {
    type: "PlaceTile",
    playerId: "2427_Rose",
    boardSquareId: 34,
  },
  {
    type: "Merge",
    playerId: "2427_Rose",
    hotelChainToKeep: "Tower",
    hotelChainToDissolve: "Worldwide",
  },
  {
    type: "SellOrphanedShare",
    playerId: "2427_Rose",
    hotelChain: "Worldwide",
  },
];
