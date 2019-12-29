import { getIndex } from "../../src/engine/utils";
import {
  BoardSquareSelectedStateType,
  BoardSquareState,
  BoardSquareStateType,
  Confirmed
} from "../../src/model/board-square-state";
import { HotelChainType } from "../../src/model/hotel-chain-type";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

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

const translatePosition = (letterNumberPosition: string): number => {
  const letter = letterNumberPosition.charAt(letterNumberPosition.length - 1);
  const num = letterNumberPosition.replace(letter, "");

  return getIndex(Number.parseInt(num, 10) - 1, letters.indexOf(letter));
};

const tilePlacedAt = (letterNumberPosition: string): Confirmed =>
  BoardSquareSelectedStateType.Confirmed(
    translatePosition(letterNumberPosition)
  );

export const BoardStateFactory = {
  createBoardState,
  tilePlacedAt
};
