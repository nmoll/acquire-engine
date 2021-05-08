import { BoardSquareState, HasHotelChain } from "../model/board-square-state";
import { HotelChainType } from "../model/hotel-chain-type";
import { IPlayerTurn } from "../model/player-turn";

export const isInBounds = (x: number, y: number) =>
  x >= 0 && x <= 11 && y >= 0 && y <= 9;

export const getIndex = (x: number, y: number) =>
  isInBounds(x, y) ? x + y * 12 : -1;

export const getPositionX = (index: number) => index % 12;
export const getPositionY = (index: number) => Math.floor(index / 12);

export const getAdjacentPositions = (
  boardStates: BoardSquareState[],
  index: number
): number[] =>
  [
    getIndex(getPositionX(index), getPositionY(index) - 1), // top
    getIndex(getPositionX(index) - 1, getPositionY(index)), // left
    getIndex(getPositionX(index) + 1, getPositionY(index)), // right
    getIndex(getPositionX(index), getPositionY(index) + 1), // bottom
  ].filter((i) => i >= 0 && i < boardStates.length);

export const getAdjacentStates = (
  boardStates: BoardSquareState[],
  index: number
): BoardSquareState[] =>
  getAdjacentPositions(boardStates, index).map((i) => boardStates[i]);

export const getAdjacentHotelChains = (
  boardState: BoardSquareState[],
  index: number
): HasHotelChain[] =>
  getAdjacentStates(boardState, index).filter(
    (state) => state.type === "HasHotelChain"
  ) as HasHotelChain[];

export const getAdjacentTiles = (
  boardState: BoardSquareState[],
  index: number
): BoardSquareState[] =>
  getAdjacentStates(boardState, index).filter(
    (state) => state.type === "HasTile"
  );

export const hasAdjacentTiles = (
  boardState: BoardSquareState[],
  index: number
): boolean => getAdjacentTiles(boardState, index).length > 0;

export const isAdjacent = (
  boardState: BoardSquareState[],
  aIndex: number,
  bIndex: number
): boolean => getAdjacentPositions(boardState, aIndex).includes(bIndex);

export const isPlacedThisTurn = (
  playerTurn: IPlayerTurn,
  index: number
): boolean =>
  playerTurn.boardSquareSelectedState.type === "Confirmed" &&
  playerTurn.boardSquareSelectedState.boardSquareId === index;

export const isUnconfirmedSelection = (
  playerTurn: IPlayerTurn,
  index: number
): boolean =>
  playerTurn.boardSquareSelectedState.type === "Unconfirmed" &&
  playerTurn.boardSquareSelectedState.boardSquareId === index;

export const isTileAdjacentToConfirmedSelection = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn,
  index: number
): boolean =>
  boardState[index].type === "HasTile" &&
  playerTurn.boardSquareSelectedState.type === "Confirmed" &&
  isAdjacent(
    boardState,
    playerTurn.boardSquareSelectedState.boardSquareId,
    index
  );

export const starterTilePlayed = (
  playerTurn: IPlayerTurn,
  index: number,
  boardState: BoardSquareState[]
): boolean =>
  isPlacedThisTurn(playerTurn, index) &&
  hasAdjacentTiles(boardState, index) &&
  playerHasSelectedHotel(playerTurn);

export const playerHasSelectedHotel = (playerTurn: IPlayerTurn): boolean =>
  playerTurn.boardSquareSelectedState.type === "Confirmed" &&
  !!playerTurn.selectedHotelChain;

export const isPendingHotel = (
  boardState: BoardSquareState[],
  index: number
): boolean => boardState[index].type === "PendingHotel";

export const getLargestHotelChain = (
  boardState: BoardSquareState[],
  hotelChains: HasHotelChain[]
): HasHotelChain =>
  hotelChains.sort(
    (a, b) =>
      findAllMatchingHotelChains(boardState, b).length -
      findAllMatchingHotelChains(boardState, a).length
  )[0];

export const getMinorityHotelChain = (
  boardState: BoardSquareState[],
  hotelChains: HasHotelChain[]
): HasHotelChain =>
  hotelChains.sort(
    (a, b) =>
      findAllMatchingHotelChains(boardState, b).length -
      findAllMatchingHotelChains(boardState, a).length
  )[1];

export const getHotelChainType = (
  boardState: BoardSquareState
): HotelChainType | null =>
  boardState.type === "HasHotelChain" ? boardState.hotelChainType : null;

export const isSameHotelChain = (
  a: BoardSquareState,
  b: BoardSquareState
): boolean =>
  a &&
  b &&
  a.type === "HasHotelChain" &&
  b.type === "HasHotelChain" &&
  getHotelChainType(a) === getHotelChainType(b);

export const findAllMatchingHotelChains = (
  boardState: BoardSquareState[],
  squareState: BoardSquareState
) => boardState.filter((state) => isSameHotelChain(state, squareState));

export const isPartOfMinorityHotelInMerge = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn,
  index: number
): boolean =>
  playerTurn.boardSquareSelectedState.type === "Confirmed"
    ? isSameHotelChain(
        getMinorityHotelChain(
          boardState,
          getAdjacentHotelChains(
            boardState,
            playerTurn.boardSquareSelectedState.boardSquareId
          )
        ),
        boardState[index]
      )
    : false;
