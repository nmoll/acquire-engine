import { GameConfig } from "../game-config";
import {
  ALL_HOTELS,
  BoardSquareState,
  HasHotelChain,
  HotelChainType,
  ISharesState,
} from "../model";
import { HotelChainState } from "../model/hotel-chain-state";
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

const getHotelChainState = (
  boardState: BoardSquareState[],
  sharesState: ISharesState
): HotelChainState =>
  boardState.reduce<HotelChainState>(
    (state, square, boardSquareId) =>
      square.type === "HasHotelChain"
        ? {
            ...state,
            [square.hotelChainType]: {
              boardSquareIds: [
                ...(state[square.hotelChainType]?.boardSquareIds || []),
                boardSquareId,
              ],
              availableShares:
                GameConfig.hotel.shares -
                Object.values(sharesState).reduce(
                  (total, shares) =>
                    total + (shares[square.hotelChainType] ?? 0),
                  0
                ),
            },
          }
        : state,
    {}
  );

const getHotelSize = (
  hotelChainType: HotelChainType,
  boardState: BoardSquareState[]
): number =>
  boardState.filter(
    (square) =>
      square.type === "HasHotelChain" &&
      square.hotelChainType === hotelChainType
  ).length;

export const HotelChainUtils = {
  getHotelChainState,
  isTypeHotelChain,
  getActiveHotelChains,
  getInactiveHotelChains,
  getAdjacentHotelChains,
  getLargestHotelChain,
  getSmallestHotelChain,
  isHotelStarter,
  getHotelSize,
};
