import {
  ALL_HOTELS,
  BoardSquareState,
  HasHotelChain,
  HotelChainType,
} from "../model";
import { HotelChainPositions } from "../model/hotel-chain-positions";
import { BoardUtils } from "./board-utils";

const isTypeHotelChain = (
  boardSquareState: BoardSquareState
): boardSquareState is HasHotelChain =>
  boardSquareState.type === "HasHotelChain" &&
  !!boardSquareState.hotelChainType;

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

const getLargestHotelChain = (
  boardState: BoardSquareState[],
  hotelChains: HasHotelChain[]
): HasHotelChain =>
  hotelChains.sort(
    (a, b) =>
      findAllMatchingHotelChains(boardState, b).length -
      findAllMatchingHotelChains(boardState, a).length
  )[0];

const getSmallestHotelChain = (
  boardState: BoardSquareState[],
  hotelChains: HasHotelChain[]
): HasHotelChain =>
  hotelChains.sort(
    (a, b) =>
      findAllMatchingHotelChains(boardState, b).length -
      findAllMatchingHotelChains(boardState, a).length
  )[1];

const isHotelStarter = (
  boardState: BoardSquareState[],
  index: number
): boolean =>
  BoardUtils.hasAdjacentTiles(boardState, index) &&
  !getAdjacentHotelChains(boardState, index).length;

const uniqueHotelChains = (hotelChains: HasHotelChain[]): HasHotelChain[] =>
  hotelChains.filter(
    (a, i) =>
      hotelChains.findIndex((b) => b.hotelChainType === a.hotelChainType) === i
  );

const getAdjacentHotelChains = (
  boardState: BoardSquareState[],
  index: number
): HasHotelChain[] =>
  uniqueHotelChains(
    BoardUtils.getAdjacentSquares(boardState, index).filter(isTypeHotelChain)
  );

const getHotelChainPositions = (
  boardState: BoardSquareState[]
): HotelChainPositions =>
  boardState.reduce<HotelChainPositions>(
    (res, square, idx) =>
      square.type === "HasHotelChain"
        ? {
            ...res,
            [square.hotelChainType]: [
              ...(res[square.hotelChainType] || []),
              idx,
            ],
          }
        : res,
    {}
  );

export const HotelChainUtils = {
  isTypeHotelChain,
  getActiveHotelChains,
  getInactiveHotelChains,
  getAdjacentHotelChains,
  getLargestHotelChain,
  getSmallestHotelChain,
  isHotelStarter,
  getHotelChainPositions,
};
