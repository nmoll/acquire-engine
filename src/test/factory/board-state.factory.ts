import { BoardSquareState, BoardSquareStateType } from "../../model";

interface SquareState {
  [key: string]: BoardSquareState;
}

const squareStates: SquareState = {
  "-": BoardSquareStateType.Default(),
  o: BoardSquareStateType.AvailableForSelection(),
  "0": BoardSquareStateType.HasTile(),
  A: BoardSquareStateType.HasHotelChain("American"),
  C: BoardSquareStateType.HasHotelChain("Continental"),
  F: BoardSquareStateType.HasHotelChain("Festival"),
  I: BoardSquareStateType.HasHotelChain("Imperial"),
  L: BoardSquareStateType.HasHotelChain("Luxor"),
  T: BoardSquareStateType.HasHotelChain("Tower"),
  W: BoardSquareStateType.HasHotelChain("Worldwide"),
};

const createBoardState = (diagram: string): BoardSquareState[] =>
  diagram
    .trim()
    .split(/\s*/)
    .map((square) => squareStates[square as keyof SquareState]);

const toAscii = (squareState: BoardSquareState): string =>
  Object.entries(squareStates).find(
    ([_, state]) => JSON.stringify(state) === JSON.stringify(squareState)
  )?.[0] ?? "";

const createDiagram = (state: BoardSquareState[]): string =>
  state.reduce(
    (res, squareState, idx) =>
      `${res} ${toAscii(squareState)}${(idx + 1) % 12 === 0 ? "\n" : ""}`,
    ""
  );

export const BoardStateFactory = {
  createBoardState,
  createDiagram,
};
