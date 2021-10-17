import { ALL_HOTELS, HotelChainType } from "../model";
import { BoardSquareState, HasHotelChain } from "../model/board-square-state";

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

const isTypeHotelChain = (
  boardSquareState: BoardSquareState
): boardSquareState is HasHotelChain =>
  boardSquareState.type === "HasHotelChain" &&
  !!boardSquareState.hotelChainType;

const getAdjacentHotelChains = (
  boardState: BoardSquareState[],
  index: number
): HasHotelChain[] =>
  uniqueHotelChains(
    getAdjacentStates(boardState, index).filter(isTypeHotelChain)
  );

const uniqueHotelChains = (hotelChains: HasHotelChain[]): HasHotelChain[] =>
  hotelChains.filter(
    (a, i) =>
      hotelChains.findIndex((b) => b.hotelChainType === a.hotelChainType) === i
  );

const getAdjacentTiles = (
  boardState: BoardSquareState[],
  index: number
): BoardSquareState[] =>
  getAdjacentStates(boardState, index).filter(
    (state) => state.type === "HasTile"
  );

const isAdjacent = (
  boardState: BoardSquareState[],
  indexA: number,
  indexB: number
): boolean => getAdjacentPositions(boardState, indexA).includes(indexB);

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

const getActiveHotelChains = (
  boardState: BoardSquareState[]
): HotelChainType[] =>
  Array.from(
    new Set(
      boardState.filter(isTypeHotelChain).map((state) => state.hotelChainType)
    )
  );

const getInactiveHotelChains = (
  boardState: BoardSquareState[]
): HotelChainType[] => {
  const active = getActiveHotelChains(boardState);
  return ALL_HOTELS.filter((hotel) => !active.includes(hotel));
};

const getMinorityHotelChain = (
  boardState: BoardSquareState[],
  hotelChains: HasHotelChain[]
): HasHotelChain =>
  hotelChains.sort(
    (a, b) =>
      findAllMatchingHotelChains(boardState, b).length -
      findAllMatchingHotelChains(boardState, a).length
  )[1];

const isSameHotelChain = (a: BoardSquareState, b: BoardSquareState): boolean =>
  a &&
  b &&
  a.type === "HasHotelChain" &&
  b.type === "HasHotelChain" &&
  a.hotelChainType === b.hotelChainType;

const findAllMatchingHotelChains = (
  boardState: BoardSquareState[],
  squareState: BoardSquareState
): HasHotelChain[] =>
  boardState.filter((state) =>
    isSameHotelChain(state, squareState)
  ) as HasHotelChain[];

const isHotelStarter = (
  boardState: BoardSquareState[],
  index: number
): boolean =>
  hasAdjacentTiles(boardState, index) &&
  !getAdjacentHotelChains(boardState, index).length;

export const BoardUtils = {
  getIndex,
  getAdjacentPositions,
  isAdjacent,
  getAdjacentHotelChains,
  hasAdjacentTiles,
  getActiveHotelChains,
  getInactiveHotelChains,
  getLargestHotelChain,
  getMinorityHotelChain,
  isHotelStarter,
};
