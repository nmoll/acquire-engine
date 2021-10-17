import { GameConfig } from "../game-config";
import { ITileState } from "../model/tile-state";
import { ArrayUtils } from "./array-utils";

const TILES = ArrayUtils.makeNumArray(GameConfig.board.size);

const getSortedBag = (seed: number): number[] =>
  ArrayUtils.shuffle(TILES, seed);

const concatPlayerTiles = (tileState: ITileState): number[] =>
  Object.values(tileState).reduce((res, tiles) => res.concat(tiles), []);

const getMaxTileIdx = (tileBag: number[], tiles: number[]): number =>
  Math.max(-1, ...tiles.map((tile) => tileBag.indexOf(tile)));

const getNextTile = (
  tileBag: number[],
  tileState: ITileState
): number | undefined =>
  tileBag[getMaxTileIdx(tileBag, concatPlayerTiles(tileState)) + 1];

export const TileUtils = {
  getSortedBag,
  getNextTile,
};
