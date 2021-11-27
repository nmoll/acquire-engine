import { BoardSquareState, HasTile } from "../model/board-square-state";

const isInBounds = (x: number, y: number): boolean =>
  x >= 0 && x <= 11 && y >= 0 && y <= 9;

const getIndex = (x: number, y: number): number =>
  isInBounds(x, y) ? x + y * 12 : -1;

const getPositionX = (index: number): number => index % 12;
const getPositionY = (index: number): number => Math.floor(index / 12);

const getAdjacentPositions = (
  boardStates: BoardSquareState[],
  index: number
): number[] =>
  [
    getIndex(getPositionX(index), getPositionY(index) - 1), // top
    getIndex(getPositionX(index) - 1, getPositionY(index)), // left
    getIndex(getPositionX(index) + 1, getPositionY(index)), // right
    getIndex(getPositionX(index), getPositionY(index) + 1), // bottom
  ].filter((i) => i >= 0 && i < boardStates.length);

const getAdjacentSquares = (
  boardStates: BoardSquareState[],
  index: number
): BoardSquareState[] =>
  getAdjacentPositions(boardStates, index).map((i) => boardStates[i]);

const hasTile = (square: BoardSquareState): square is HasTile =>
  square.type === "HasTile";

const getAdjacentTiles = (
  boardState: BoardSquareState[],
  index: number
): HasTile[] => getAdjacentSquares(boardState, index).filter(hasTile);

const isAdjacent = (
  boardState: BoardSquareState[],
  indexA: number,
  indexB: number
): boolean => getAdjacentPositions(boardState, indexA).includes(indexB);

const hasAdjacentTiles = (
  boardState: BoardSquareState[],
  index: number
): boolean => getAdjacentTiles(boardState, index).length > 0;

export const BoardUtils = {
  getIndex,
  isAdjacent,
  getAdjacentPositions,
  getAdjacentSquares,
  hasAdjacentTiles,
};
