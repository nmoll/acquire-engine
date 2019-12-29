import {
  BoardSquareState,
  BoardSquareStateType
} from "../../src/model/board-square-state";
import { HotelChainType } from "../../src/model/hotel-chain-type";

const squareStates = {
  "-": BoardSquareStateType.None(),
  o: BoardSquareStateType.AvailableForSelection(),
  O: BoardSquareStateType.Selected(),
  "0": BoardSquareStateType.HasTile(),
  "*": BoardSquareStateType.PendingHotel(),
  A: BoardSquareStateType.HasHotelChain(HotelChainType.AMERICAN),
  C: BoardSquareStateType.HasHotelChain(HotelChainType.CONTINENTAL),
  F: BoardSquareStateType.HasHotelChain(HotelChainType.FESTIVAL),
  I: BoardSquareStateType.HasHotelChain(HotelChainType.IMPERIAL),
  L: BoardSquareStateType.HasHotelChain(HotelChainType.LUXOR),
  T: BoardSquareStateType.HasHotelChain(HotelChainType.TOWER),
  W: BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE)
};

const createBoardState = (diagram: string): BoardSquareState[] => {
  const squares = diagram.trim().split(/\s*/);
  return squares.map(square => squareStates[square]);
};

export const BoardStateFactory = {
  createBoardState
};
