import { BoardSquareState, HasHotelChain } from "../model/board-square-state";
import { HotelChainType } from "../model/hotel-chain-type";

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

const getAdjacentStates = (
  boardStates: BoardSquareState[],
  index: number
): BoardSquareState[] =>
  getAdjacentPositions(boardStates, index).map((i) => boardStates[i]);

const getAdjacentHotelChains = (
  boardState: BoardSquareState[],
  index: number
): HasHotelChain[] =>
  getAdjacentStates(boardState, index).filter(
    (state) => state.type === "HasHotelChain"
  ) as HasHotelChain[];

const getAdjacentTiles = (
  boardState: BoardSquareState[],
  index: number
): BoardSquareState[] =>
  getAdjacentStates(boardState, index).filter(
    (state) => state.type === "HasTile"
  );

const hasAdjacentTiles = (
  boardState: BoardSquareState[],
  index: number
): boolean => getAdjacentTiles(boardState, index).length > 0;

const getLargestHotelChain = (
  boardState: BoardSquareState[],
  hotelChains: HasHotelChain[]
): HasHotelChain =>
  hotelChains.sort(
    (a, b) =>
      findAllMatchingHotelChains(boardState, b).length -
      findAllMatchingHotelChains(boardState, a).length
  )[0];

const getMinorityHotelChain = (
  boardState: BoardSquareState[],
  hotelChains: HasHotelChain[]
): HasHotelChain =>
  hotelChains.sort(
    (a, b) =>
      findAllMatchingHotelChains(boardState, b).length -
      findAllMatchingHotelChains(boardState, a).length
  )[1];

const getHotelChainType = (
  boardState: BoardSquareState
): HotelChainType | null =>
  boardState.type === "HasHotelChain" ? boardState.hotelChainType : null;

const isSameHotelChain = (a: BoardSquareState, b: BoardSquareState): boolean =>
  a &&
  b &&
  a.type === "HasHotelChain" &&
  b.type === "HasHotelChain" &&
  getHotelChainType(a) === getHotelChainType(b);

const findAllMatchingHotelChains = (
  boardState: BoardSquareState[],
  squareState: BoardSquareState
): HasHotelChain[] =>
  boardState.filter((state) =>
    isSameHotelChain(state, squareState)
  ) as HasHotelChain[];

export const Utils = {
  getIndex,
  getAdjacentPositions,
  getAdjacentHotelChains,
  hasAdjacentTiles,
  getLargestHotelChain,
  getMinorityHotelChain,
};
