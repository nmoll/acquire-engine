import { ArrayUtils } from "../utils/array-utils";
import { BoardUtils } from "../utils/board-utils";
import { BoardSquareState, BoardSquareStateType } from "./board-square-state";
import { Hotel } from "./hotel";

export class Board {
  constructor(private squares: BoardSquareState[]) {}

  public static createEmpty(size: number): Board {
    const squares = ArrayUtils.makeNumArray(size).map(() =>
      BoardSquareStateType.Default()
    );
    return new Board(squares);
  }

  public getState(): BoardSquareState[] {
    return this.squares;
  }

  public mergeHotels(
    survivor: Hotel,
    dissolved: Hotel[],
    mergerTile: number | null
  ): Board {
    const majorityBoardState = BoardSquareStateType.HasHotelChain(
      survivor.type
    );

    if (mergerTile === null) {
      mergerTile = this.squares.findIndex(
        (square, idx) =>
          square.type === "HasTile" &&
          this.getAdjacentIndices(idx).some(
            (i) => this.squares[i].type === "HasHotelChain"
          )
      );
    }

    if (mergerTile === -1) {
      throw new Error("No merger tile found");
    }

    const boardSquareIds = dissolved.reduce<number[]>(
      (acc, hotel) => acc.concat(hotel.boardSquareIds),
      []
    );

    return this.update(mergerTile, majorityBoardState)
      .updateAll(boardSquareIds, majorityBoardState)
      .updateAdjacentTiles(mergerTile, majorityBoardState);
  }

  public update(index: number, state: BoardSquareState): Board {
    return this.updateAll([index], state);
  }

  public updateAll(indices: number[], newState: BoardSquareState): Board {
    return new Board(
      this.getState().map((square, index) =>
        indices.includes(index) ? newState : square
      )
    );
  }

  public updateAdjacentTiles(index: number, newState: BoardSquareState): Board {
    return this.updateAll([...this.getAdjacentTiles(index), index], newState);
  }

  public getAdjacentIndices(index: number): number[] {
    return BoardUtils.getAdjacentPositions(this.getState(), index);
  }

  public isHotelStarter(index: number): boolean {
    return (
      this.getAdjacentTiles(index).length >= 1 &&
      !this.getAdjacentIndices(index).some(
        (i) => this.squares[i].type === "HasHotelChain"
      )
    );
  }

  private getAdjacentTiles(index: number): number[] {
    return this.getAdjacentIndices(index).filter(
      (idx) => this.squares[idx].type === "HasTile"
    );
  }
}
