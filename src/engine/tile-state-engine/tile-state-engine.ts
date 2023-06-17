import { GameConfig } from "../../game-config";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerActionResult } from "../../model/player-action-result";
import { ITileState } from "../../model/tile-state";
import { TileUtils } from "../../utils/tile-utils";

const getInitialState = (gameInstance: IAcquireGameInstance): ITileState => {
  const tileBag = TileUtils.getSortedBag(gameInstance.randomSeed);

  return gameInstance.playerIds.reduce<ITileState>(
    (res, playerId) =>
      addPlayerTiles(GameConfig.tile.rackSize, playerId, tileBag, res),
    {}
  );
};

export const computeState = (
  gameInstance: IAcquireGameInstance,
  actionResult: PlayerActionResult,
  tileState: ITileState
): ITileState => {
  const tileBag = TileUtils.getSortedBag(gameInstance.randomSeed);
  const playerAction = actionResult.action;

  if (playerAction.type === "PlaceTile") {
    return discardPlayerTile(
      playerAction.playerId,
      playerAction.boardSquareId,
      tileState
    );
  } else if (playerAction.type === "EndTurn") {
    return addPlayerTile(playerAction.playerId, tileBag, tileState);
  } else {
    return tileState;
  }
};

const addPlayerTile = (
  playerId: string,
  tileBag: number[],
  tileState: ITileState
): ITileState => {
  const nextTile = TileUtils.getNextTile(tileBag, tileState);

  if (nextTile === undefined) {
    return tileState;
  }

  return {
    ...tileState,
    [playerId]: [...(tileState[playerId] ?? []), nextTile],
  };
};

const addPlayerTiles = (
  amount: number,
  playerId: string,
  tileBag: number[],
  tileState: ITileState
): ITileState => {
  if (amount >= 1) {
    const stateAfterAdd = addPlayerTile(playerId, tileBag, tileState);
    return addPlayerTiles(amount - 1, playerId, tileBag, stateAfterAdd);
  } else {
    return tileState;
  }
};

const discardPlayerTile = (
  playerId: string,
  tileId: number,
  tileState: ITileState
): ITileState => ({
  ...tileState,
  [playerId]: tileState[playerId].filter(
    (playerTileId) => playerTileId !== tileId
  ),
});

export const TileStateEngine = {
  getInitialState,
  computeState,
};
