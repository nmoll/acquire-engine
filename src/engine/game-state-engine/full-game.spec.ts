import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerAction, PlayerActionType } from "../../model/player-action";
import { createGameInstance } from "../../test/factory/game-instance.factory";
import { formatTile } from "../../test/factory/tile.factory";
import { tile } from "../../test/helpers";
import { gameStateSnapshotSerializer } from "../../test/snapshot-serializer/game-state-snapshot-serializer";
import { GameStateEngine } from "./game-state-engine";

expect.addSnapshotSerializer(gameStateSnapshotSerializer);

const gameInstance: IAcquireGameInstance = createGameInstance({
  randomSeed: 1,
  playerIds: ["1", "2", "3", "4"],
});

it("Game Play", () => {
  let actions: PlayerAction[] = [];

  const playAndRecord = (action: PlayerAction) => {
    actions.push(action);

    let desc = `(${actions.length}) Player ${action.playerId}`;
    switch (action.type) {
      case "PlaceTile":
        desc += ` places tile ${formatTile(action.boardSquareId)}`;
        break;
      case "StartHotelChain":
        desc += ` starts ${action.hotelChain}`;
        break;
      case "Merge":
        desc += ` merges ${action.hotelChainToKeep}`;
        break;
      case "PurchaseShares":
        desc += ` purchases ${action.hotelChain}`;
        break;
      case "SellOrphanedShare":
        desc += ` sells 1 orphaned ${action.hotelChain} share`;
        break;
      case "KeepOrphanedShare":
        desc += ` keeps 1 orphaned ${action.hotelChain} share`;
        break;
      case "TradeOrphanedShare":
        desc += ` trades 2 ${action.hotelChain} -> ${action.hotelChainToReceive}`;
        break;
      case "EndTurn":
        desc += ` ends turn`;
        break;
    }

    expect(
      GameStateEngine.computeGameState(gameInstance, actions)
    ).toMatchSnapshot(desc);
  };

  playAndRecord(PlayerActionType.PlaceTile("1", tile("5G")));
  playAndRecord(PlayerActionType.EndTurn("1"));

  playAndRecord(PlayerActionType.PlaceTile("2", tile("4G")));
  playAndRecord(PlayerActionType.StartHotelChain("2", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("2", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("2", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("2", "American"));
  playAndRecord(PlayerActionType.EndTurn("2"));

  playAndRecord(PlayerActionType.PlaceTile("3", tile("6C")));
  playAndRecord(PlayerActionType.PurchaseShares("3", "American"));
  playAndRecord(PlayerActionType.EndTurn("3"));

  playAndRecord(PlayerActionType.PlaceTile("4", tile("6F")));
  playAndRecord(PlayerActionType.EndTurn("4"));

  playAndRecord(PlayerActionType.PlaceTile("1", tile("4F")));
  playAndRecord(PlayerActionType.PurchaseShares("1", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("1", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("1", "American"));
  playAndRecord(PlayerActionType.EndTurn("1"));

  playAndRecord(PlayerActionType.PlaceTile("2", tile("4D")));
  playAndRecord(PlayerActionType.PurchaseShares("2", "American"));
  playAndRecord(PlayerActionType.EndTurn("2"));

  playAndRecord(PlayerActionType.PlaceTile("3", tile("10H")));
  playAndRecord(PlayerActionType.PurchaseShares("3", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "American"));
  playAndRecord(PlayerActionType.EndTurn("3"));

  playAndRecord(PlayerActionType.PlaceTile("4", tile("1F")));
  playAndRecord(PlayerActionType.EndTurn("4"));

  playAndRecord(PlayerActionType.PlaceTile("1", tile("8A")));
  playAndRecord(PlayerActionType.PurchaseShares("1", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("1", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("1", "American"));
  playAndRecord(PlayerActionType.EndTurn("1"));

  playAndRecord(PlayerActionType.PlaceTile("2", tile("3C")));
  playAndRecord(PlayerActionType.PurchaseShares("2", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("2", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("2", "American"));
  playAndRecord(PlayerActionType.EndTurn("2"));

  playAndRecord(PlayerActionType.PlaceTile("3", tile("10G")));
  playAndRecord(PlayerActionType.StartHotelChain("3", "Festival"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "Festival"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "Festival"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "Festival"));
  playAndRecord(PlayerActionType.EndTurn("3"));

  playAndRecord(PlayerActionType.PlaceTile("4", tile("8B")));
  playAndRecord(PlayerActionType.StartHotelChain("4", "Tower"));
  playAndRecord(PlayerActionType.PurchaseShares("4", "Tower"));
  playAndRecord(PlayerActionType.PurchaseShares("4", "Tower"));
  playAndRecord(PlayerActionType.PurchaseShares("4", "Tower"));
  playAndRecord(PlayerActionType.EndTurn("4"));

  playAndRecord(PlayerActionType.PlaceTile("1", tile("12A")));
  playAndRecord(PlayerActionType.PurchaseShares("1", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("1", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("1", "American"));
  playAndRecord(PlayerActionType.EndTurn("1"));

  playAndRecord(PlayerActionType.PlaceTile("2", tile("8C")));
  playAndRecord(PlayerActionType.PurchaseShares("2", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("2", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("2", "American"));
  playAndRecord(PlayerActionType.EndTurn("2"));

  playAndRecord(PlayerActionType.PlaceTile("3", tile("2G")));
  playAndRecord(PlayerActionType.PurchaseShares("3", "American"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "Tower"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "Tower"));
  playAndRecord(PlayerActionType.EndTurn("3"));

  playAndRecord(PlayerActionType.PlaceTile("4", tile("7B")));
  playAndRecord(PlayerActionType.PurchaseShares("4", "Festival"));
  playAndRecord(PlayerActionType.PurchaseShares("4", "Festival"));
  playAndRecord(PlayerActionType.PurchaseShares("4", "Festival"));
  playAndRecord(PlayerActionType.EndTurn("4"));

  playAndRecord(PlayerActionType.PlaceTile("1", tile("1E")));
  playAndRecord(PlayerActionType.StartHotelChain("1", "Worldwide"));
  playAndRecord(PlayerActionType.PurchaseShares("1", "Worldwide"));
  playAndRecord(PlayerActionType.PurchaseShares("1", "Worldwide"));
  playAndRecord(PlayerActionType.PurchaseShares("1", "Worldwide"));
  playAndRecord(PlayerActionType.EndTurn("1"));

  playAndRecord(PlayerActionType.PlaceTile("2", tile("10C")));
  playAndRecord(PlayerActionType.PurchaseShares("2", "Worldwide"));
  playAndRecord(PlayerActionType.PurchaseShares("2", "Festival"));
  playAndRecord(PlayerActionType.PurchaseShares("2", "Tower"));
  playAndRecord(PlayerActionType.EndTurn("2"));

  playAndRecord(PlayerActionType.PlaceTile("3", tile("2H")));
  playAndRecord(PlayerActionType.StartHotelChain("3", "Imperial"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "Imperial"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "Imperial"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "Imperial"));
  playAndRecord(PlayerActionType.EndTurn("3"));

  playAndRecord(PlayerActionType.PlaceTile("4", tile("11E")));
  playAndRecord(PlayerActionType.PurchaseShares("4", "Imperial"));
  playAndRecord(PlayerActionType.PurchaseShares("4", "Imperial"));
  playAndRecord(PlayerActionType.PurchaseShares("4", "Imperial"));
  playAndRecord(PlayerActionType.EndTurn("4"));

  playAndRecord(PlayerActionType.PlaceTile("1", tile("11D")));
  playAndRecord(PlayerActionType.StartHotelChain("1", "Continental"));
  playAndRecord(PlayerActionType.PurchaseShares("1", "Continental"));
  playAndRecord(PlayerActionType.PurchaseShares("1", "Continental"));
  playAndRecord(PlayerActionType.PurchaseShares("1", "Continental"));
  playAndRecord(PlayerActionType.EndTurn("1"));

  playAndRecord(PlayerActionType.PlaceTile("2", tile("3E")));
  playAndRecord(PlayerActionType.PurchaseShares("2", "Continental"));
  playAndRecord(PlayerActionType.PurchaseShares("2", "Festival"));
  playAndRecord(PlayerActionType.PurchaseShares("2", "Festival"));
  playAndRecord(PlayerActionType.EndTurn("2"));

  playAndRecord(PlayerActionType.PlaceTile("3", tile("4C")));
  playAndRecord(PlayerActionType.StartHotelChain("3", "Luxor"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "Luxor"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "Luxor"));
  playAndRecord(PlayerActionType.PurchaseShares("3", "Luxor"));
  playAndRecord(PlayerActionType.EndTurn("3"));

  playAndRecord(PlayerActionType.PlaceTile("4", tile("4I")));
  playAndRecord(PlayerActionType.PurchaseShares("4", "Luxor"));
  playAndRecord(PlayerActionType.PurchaseShares("4", "Luxor"));
  playAndRecord(PlayerActionType.PurchaseShares("4", "Luxor"));
  playAndRecord(PlayerActionType.EndTurn("4"));

  playAndRecord(PlayerActionType.PlaceTile("1", tile("7C")));
  playAndRecord(PlayerActionType.PurchaseShares("1", "Festival"));
  playAndRecord(PlayerActionType.EndTurn("1"));

  playAndRecord(PlayerActionType.PlaceTile("2", tile("6G")));
  playAndRecord(PlayerActionType.PurchaseShares("2", "Festival"));
  playAndRecord(PlayerActionType.EndTurn("2"));

  playAndRecord(PlayerActionType.PlaceTile("3", tile("8G")));
  playAndRecord(PlayerActionType.PurchaseShares("3", "Continental"));
  playAndRecord(PlayerActionType.EndTurn("3"));

  playAndRecord(PlayerActionType.PlaceTile("4", tile("11F")));
  playAndRecord(PlayerActionType.EndTurn("4"));

  playAndRecord(PlayerActionType.PlaceTile("1", tile("4H")));
  playAndRecord(PlayerActionType.EndTurn("1"));

  playAndRecord(PlayerActionType.PlaceTile("2", tile("6A")));
  playAndRecord(PlayerActionType.EndTurn("2"));

  playAndRecord(PlayerActionType.PlaceTile("3", tile("6I")));
  playAndRecord(PlayerActionType.EndTurn("3"));

  playAndRecord(PlayerActionType.PlaceTile("4", tile("11H")));
  playAndRecord(PlayerActionType.EndTurn("4"));

  playAndRecord(PlayerActionType.PlaceTile("1", tile("2I")));
  playAndRecord(PlayerActionType.EndTurn("1"));

  playAndRecord(PlayerActionType.PlaceTile("2", tile("3G")));
  playAndRecord(
    PlayerActionType.TradeOrphanedShare("3", "Imperial", "American")
  );
  playAndRecord(PlayerActionType.SellOrphanedShare("3", "Imperial"));
  playAndRecord(PlayerActionType.KeepOrphanedShare("3", "Imperial"));
  playAndRecord(PlayerActionType.SellOrphanedShare("4", "Imperial"));
  playAndRecord(
    PlayerActionType.TradeOrphanedShare("4", "Imperial", "American")
  );
  //TODO: Player 2 is out of money but can buy stocks because the system
  // thinks it's player 4's turn

  // playAndRecord(PlayerActionType.PlaceTile("3", tile("5A")));
  // playAndRecord(PlayerActionType.StartHotelChain("3", "Imperial"));
  // playAndRecord(PlayerActionType.EndTurn("3"));
});
