import { it } from "vitest";
import { IAcquireGameInstance } from "../../../model/acquire-game-instance";
import { PlayerAction, PlayerActionType } from "../../../model/player-action";
import { createGameInstance } from "../../../test/factory/game-instance.factory";
import { playAndRecordActions, tile } from "../../../test/helpers";

/**
 * This tests:
 *  - Cannot trade 2 -> 1 if majority shares are sold out
 */
it("Game Play", () => {
  playAndRecordActions(gameInstance, actions);
});

const gameInstance: IAcquireGameInstance = createGameInstance({
  randomSeed: 1,
  playerIds: ["1", "2", "3", "4"],
});

const actions: PlayerAction[] = [
  PlayerActionType.PlaceTile("1", tile("5G")),
  PlayerActionType.EndTurn("1"),

  PlayerActionType.PlaceTile("2", tile("4G")),
  PlayerActionType.StartHotelChain("2", "American"),
  PlayerActionType.PurchaseShares("2", "American"),
  PlayerActionType.PurchaseShares("2", "American"),
  PlayerActionType.PurchaseShares("2", "American"),
  PlayerActionType.EndTurn("2"),

  PlayerActionType.PlaceTile("3", tile("6C")),
  PlayerActionType.PurchaseShares("3", "American"),
  PlayerActionType.EndTurn("3"),

  PlayerActionType.PlaceTile("4", tile("6F")),
  PlayerActionType.EndTurn("4"),

  PlayerActionType.PlaceTile("1", tile("4F")),
  PlayerActionType.PurchaseShares("1", "American"),
  PlayerActionType.PurchaseShares("1", "American"),
  PlayerActionType.PurchaseShares("1", "American"),
  PlayerActionType.EndTurn("1"),

  PlayerActionType.PlaceTile("2", tile("4D")),
  PlayerActionType.PurchaseShares("2", "American"),
  PlayerActionType.EndTurn("2"),

  PlayerActionType.PlaceTile("3", tile("10H")),
  PlayerActionType.PurchaseShares("3", "American"),
  PlayerActionType.PurchaseShares("3", "American"),
  PlayerActionType.PurchaseShares("3", "American"),
  PlayerActionType.EndTurn("3"),

  PlayerActionType.PlaceTile("4", tile("1F")),
  PlayerActionType.EndTurn("4"),

  PlayerActionType.PlaceTile("1", tile("8A")),
  PlayerActionType.PurchaseShares("1", "American"),
  PlayerActionType.PurchaseShares("1", "American"),
  PlayerActionType.PurchaseShares("1", "American"),
  PlayerActionType.EndTurn("1"),

  PlayerActionType.PlaceTile("2", tile("3C")),
  PlayerActionType.PurchaseShares("2", "American"),
  PlayerActionType.PurchaseShares("2", "American"),
  PlayerActionType.PurchaseShares("2", "American"),
  PlayerActionType.EndTurn("2"),

  PlayerActionType.PlaceTile("3", tile("10G")),
  PlayerActionType.StartHotelChain("3", "Festival"),
  PlayerActionType.PurchaseShares("3", "Festival"),
  PlayerActionType.PurchaseShares("3", "Festival"),
  PlayerActionType.PurchaseShares("3", "Festival"),
  PlayerActionType.EndTurn("3"),

  PlayerActionType.PlaceTile("4", tile("8B")),
  PlayerActionType.StartHotelChain("4", "Tower"),
  PlayerActionType.PurchaseShares("4", "Tower"),
  PlayerActionType.PurchaseShares("4", "Tower"),
  PlayerActionType.PurchaseShares("4", "Tower"),
  PlayerActionType.EndTurn("4"),

  PlayerActionType.PlaceTile("1", tile("12A")),
  PlayerActionType.PurchaseShares("1", "American"),
  PlayerActionType.PurchaseShares("1", "American"),
  PlayerActionType.PurchaseShares("1", "American"),
  PlayerActionType.EndTurn("1"),

  PlayerActionType.PlaceTile("2", tile("8C")),
  PlayerActionType.PurchaseShares("2", "American"),
  PlayerActionType.PurchaseShares("2", "American"),
  PlayerActionType.PurchaseShares("2", "American"),
  PlayerActionType.EndTurn("2"),

  PlayerActionType.PlaceTile("3", tile("2G")),
  PlayerActionType.PurchaseShares("3", "American"),
  PlayerActionType.PurchaseShares("3", "Tower"),
  PlayerActionType.PurchaseShares("3", "Tower"),
  PlayerActionType.EndTurn("3"),

  PlayerActionType.PlaceTile("4", tile("7B")),
  PlayerActionType.PurchaseShares("4", "Festival"),
  PlayerActionType.PurchaseShares("4", "Festival"),
  PlayerActionType.PurchaseShares("4", "Festival"),
  PlayerActionType.EndTurn("4"),

  PlayerActionType.PlaceTile("1", tile("1E")),
  PlayerActionType.StartHotelChain("1", "Worldwide"),
  PlayerActionType.PurchaseShares("1", "Worldwide"),
  PlayerActionType.PurchaseShares("1", "Worldwide"),
  PlayerActionType.PurchaseShares("1", "Worldwide"),
  PlayerActionType.EndTurn("1"),

  PlayerActionType.PlaceTile("2", tile("10C")),
  PlayerActionType.PurchaseShares("2", "Worldwide"),
  PlayerActionType.PurchaseShares("2", "Festival"),
  PlayerActionType.PurchaseShares("2", "Tower"),
  PlayerActionType.EndTurn("2"),

  PlayerActionType.PlaceTile("3", tile("2H")),
  PlayerActionType.StartHotelChain("3", "Imperial"),
  PlayerActionType.PurchaseShares("3", "Imperial"),
  PlayerActionType.PurchaseShares("3", "Imperial"),
  PlayerActionType.PurchaseShares("3", "Imperial"),
  PlayerActionType.EndTurn("3"),

  PlayerActionType.PlaceTile("4", tile("11E")),
  PlayerActionType.PurchaseShares("4", "Imperial"),
  PlayerActionType.PurchaseShares("4", "Imperial"),
  PlayerActionType.PurchaseShares("4", "Imperial"),
  PlayerActionType.EndTurn("4"),

  PlayerActionType.PlaceTile("1", tile("11D")),
  PlayerActionType.StartHotelChain("1", "Continental"),
  PlayerActionType.PurchaseShares("1", "Continental"),
  PlayerActionType.PurchaseShares("1", "Continental"),
  PlayerActionType.PurchaseShares("1", "Continental"),
  PlayerActionType.EndTurn("1"),

  PlayerActionType.PlaceTile("2", tile("3E")),
  PlayerActionType.PurchaseShares("2", "Continental"),
  PlayerActionType.PurchaseShares("2", "Festival"),
  PlayerActionType.PurchaseShares("2", "Festival"),
  PlayerActionType.EndTurn("2"),

  PlayerActionType.PlaceTile("3", tile("4C")),
  PlayerActionType.StartHotelChain("3", "Luxor"),
  PlayerActionType.PurchaseShares("3", "Luxor"),
  PlayerActionType.PurchaseShares("3", "Luxor"),
  PlayerActionType.PurchaseShares("3", "Luxor"),
  PlayerActionType.EndTurn("3"),

  PlayerActionType.PlaceTile("4", tile("4I")),
  PlayerActionType.PurchaseShares("4", "Luxor"),
  PlayerActionType.PurchaseShares("4", "Luxor"),
  PlayerActionType.PurchaseShares("4", "Luxor"),
  PlayerActionType.EndTurn("4"),

  PlayerActionType.PlaceTile("1", tile("7C")),
  PlayerActionType.PurchaseShares("1", "Festival"),
  PlayerActionType.EndTurn("1"),

  PlayerActionType.PlaceTile("2", tile("6G")),
  PlayerActionType.PurchaseShares("2", "Festival"),
  PlayerActionType.EndTurn("2"),

  PlayerActionType.PlaceTile("3", tile("8G")),
  PlayerActionType.PurchaseShares("3", "Continental"),
  PlayerActionType.EndTurn("3"),

  PlayerActionType.PlaceTile("4", tile("11F")),
  PlayerActionType.EndTurn("4"),

  PlayerActionType.PlaceTile("1", tile("4H")),
  PlayerActionType.EndTurn("1"),

  PlayerActionType.PlaceTile("2", tile("6A")),
  PlayerActionType.EndTurn("2"),

  PlayerActionType.PlaceTile("3", tile("6I")),
  PlayerActionType.EndTurn("3"),

  PlayerActionType.PlaceTile("4", tile("11H")),
  PlayerActionType.EndTurn("4"),

  PlayerActionType.PlaceTile("1", tile("2I")),
  PlayerActionType.EndTurn("1"),

  PlayerActionType.PlaceTile("2", tile("3G")),
];
