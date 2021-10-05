import {
  BoardSquareState,
  BoardSquareStateType,
  HotelChainType,
} from "../../model";

interface SquareState {
  [key: string]: BoardSquareState;
}

const squareStates: SquareState = {
  "-": BoardSquareStateType.Default(),
  o: BoardSquareStateType.AvailableForSelection(),
  "0": BoardSquareStateType.HasTile(),
  A: BoardSquareStateType.HasHotelChain(HotelChainType.AMERICAN),
  C: BoardSquareStateType.HasHotelChain(HotelChainType.CONTINENTAL),
  F: BoardSquareStateType.HasHotelChain(HotelChainType.FESTIVAL),
  I: BoardSquareStateType.HasHotelChain(HotelChainType.IMPERIAL),
  L: BoardSquareStateType.HasHotelChain(HotelChainType.LUXOR),
  T: BoardSquareStateType.HasHotelChain(HotelChainType.TOWER),
  W: BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
};

const createBoardState = (diagram: string): BoardSquareState[] => {
  const squares = diagram.trim().split(/\s*/);
  return squares.map((square) => squareStates[square as keyof SquareState]);
};

export const BoardStateFactory = {
  createBoardState,
};
