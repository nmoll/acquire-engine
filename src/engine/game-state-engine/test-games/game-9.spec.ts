import { it } from "vitest";
import { IAcquireGameInstance } from "../../../model/acquire-game-instance";
import { PlayerAction } from "../../../model/player-action";
import { playAndRecordActions } from "../../../test/helpers";

/**
 * This tests that a player with all unplayable (starter tiles that can't be played) should
 * be presented with an action to continue without placing a tile.
 *
 * NOTE: this is currently not implemented
 */
it("Game Play", () => {
  playAndRecordActions(game.gameInstance, game.actions);
});

export const game: {
  gameInstance: IAcquireGameInstance;
  actions: PlayerAction[];
} = {
  gameInstance: {
    id: "512FCB",
    randomSeed: 809,
    playerIds: ["9186_Justin", "5031_Nate"],
    hostId: "9186_Justin",
    state: "started",
  },
  actions: [
    {
      type: "PlaceTile",
      playerId: "9186_Justin",
      boardSquareId: 95,
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 107,
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
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "9186_Justin",
      boardSquareId: 75,
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 2,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "9186_Justin",
      boardSquareId: 87,
    },
    {
      type: "StartHotelChain",
      playerId: "9186_Justin",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 28,
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
      playerId: "9186_Justin",
      boardSquareId: 1,
    },
    {
      type: "StartHotelChain",
      playerId: "9186_Justin",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 91,
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
      playerId: "9186_Justin",
      boardSquareId: 83,
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 51,
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
      playerId: "9186_Justin",
      boardSquareId: 49,
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 102,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "9186_Justin",
      boardSquareId: 29,
    },
    {
      type: "StartHotelChain",
      playerId: "9186_Justin",
      hotelChain: "Imperial",
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 105,
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
      playerId: "9186_Justin",
      boardSquareId: 48,
    },
    {
      type: "StartHotelChain",
      playerId: "9186_Justin",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Continental",
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "American",
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 97,
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
      playerId: "9186_Justin",
      boardSquareId: 64,
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Tower",
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
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
      playerId: "9186_Justin",
      boardSquareId: 33,
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 53,
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
      playerId: "9186_Justin",
      boardSquareId: 45,
    },
    {
      type: "StartHotelChain",
      playerId: "9186_Justin",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 30,
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
      playerId: "9186_Justin",
      boardSquareId: 21,
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 17,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "9186_Justin",
      boardSquareId: 9,
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Worldwide",
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Tower",
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Festival",
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 76,
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
      playerId: "9186_Justin",
      boardSquareId: 65,
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Festival",
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "American",
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Continental",
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 24,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "9186_Justin",
      boardSquareId: 98,
    },
    {
      type: "StartHotelChain",
      playerId: "9186_Justin",
      hotelChain: "Luxor",
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 56,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "9186_Justin",
      boardSquareId: 37,
    },
    {
      type: "PurchaseShares",
      playerId: "9186_Justin",
      hotelChain: "Luxor",
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 13,
    },
    {
      type: "EndTurn",
      playerId: "5031_Nate",
    },
    {
      type: "PlaceTile",
      playerId: "9186_Justin",
      boardSquareId: 7,
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
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
      playerId: "9186_Justin",
      boardSquareId: 84,
    },
    {
      type: "EndTurn",
      playerId: "9186_Justin",
    },
    {
      type: "PlaceTile",
      playerId: "5031_Nate",
      boardSquareId: 10,
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
  ],
};
