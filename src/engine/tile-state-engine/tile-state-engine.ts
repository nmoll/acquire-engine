import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerAction } from "../../model/player-action";
import { ITileState } from "../../model/tile-state";
import { TileUtils } from "../../utils/tile-utils";

const TILE_RACK_SIZE = 5;

const addPlayerTile = (
  playerId: string,
  tileBag: number[],
  tileState: ITileState
): ITileState => {
  const nextTile = TileUtils.getNextTile(tileBag, tileState);

  if (!nextTile) {
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

const getInitialState = (
  gameInstance: IAcquireGameInstance,
  tileBag: number[]
): ITileState => {
  return gameInstance.playerIds.reduce<ITileState>(
    (res, playerId) => addPlayerTiles(TILE_RACK_SIZE, playerId, tileBag, res),
    {}
  );
};

export const computeState = (
  gameInstance: IAcquireGameInstance,
  playerAction: PlayerAction | null = null,
  tileState: ITileState | null = null
): ITileState => {
  const tileBag = TileUtils.getSortedBag(gameInstance.randomSeed);
  if (!tileState) {
    return getInitialState(gameInstance, tileBag);
  }
  if (!playerAction) {
    return tileState;
  }

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

export const TileStateEngine = {
  computeState,
};
