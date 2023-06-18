import { GameStateEngine } from "../engine/game-state-engine/game-state-engine";
import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerAction } from "../model/player-action";
import { IShares } from "../model/shares";
import { BoardUtils } from "../utils/board-utils";
import { formatTile } from "./factory/tile.factory";
import { gameStateSnapshotSerializer } from "./snapshot-serializer/game-state-snapshot-serializer";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

export const america = (quantity: number): IShares => ({
  hotel: "American",
  quantity,
});

export const continental = (quantity: number): IShares => ({
  hotel: "Continental",
  quantity,
});

export const tile = (tileLabel: string): number => {
  const letter = tileLabel.charAt(tileLabel.length - 1);
  const num = tileLabel.replace(letter, "");

  return BoardUtils.getIndex(
    Number.parseInt(num, 10) - 1,
    letters.indexOf(letter)
  );
};

export const getActionDescription = (action: PlayerAction): string => {
  switch (action.type) {
    case "PlaceTile":
      return `Player ${action.playerId} places tile ${formatTile(
        action.boardSquareId
      )}`;
    case "StartHotelChain":
      return `Player ${action.playerId} starts ${action.hotelChain}`;
    case "Merge":
      return `Player ${action.playerId} merges ${action.hotelChainToKeep}`;
    case "PurchaseShares":
      return `Player ${action.playerId} purchases ${action.hotelChain}`;
    case "SellOrphanedShare":
      return `Player ${action.playerId} sells 1 orphaned ${action.hotelChain} share`;
    case "KeepOrphanedShare":
      return `Player ${action.playerId} keeps 1 orphaned ${action.hotelChain} share`;
    case "TradeOrphanedShare":
      return `Player ${action.playerId} trades 2 ${action.hotelChain} -> ${action.hotelChainToReceive}`;
    case "EndTurn":
      return `Player ${action.playerId} ends turn`;
  }
};

export const playAndRecordActions = (
  gameInstance: IAcquireGameInstance,
  actions: PlayerAction[]
) => {
  expect.addSnapshotSerializer(gameStateSnapshotSerializer);

  const playedActions: PlayerAction[] = [];

  actions.forEach((action) => {
    playedActions.push(action);

    const desc = `(${playedActions.length}) ${getActionDescription(action)}`;

    expect(
      GameStateEngine.computeGameState(gameInstance, playedActions)
    ).toMatchSnapshot(desc);
  });
};
