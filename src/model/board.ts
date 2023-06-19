import { ArrayUtils } from "../utils/array-utils";
import { BoardUtils } from "../utils/board-utils";
import { BoardSquareState, BoardSquareStateType } from "./board-square-state";
import { Hotel } from "./hotel";
import { HotelChainType } from "./hotel-chain-type";

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

  public getHotel<T extends HotelChainType>(type: T): Hotel<T> {
    const boardSquareIds: number[] = [];
    for (let i = 0; i < this.squares.length; i++) {
      const square = this.squares[i];
      if (square.type === "HasHotelChain" && square.hotelChainType === type) {
        boardSquareIds.push(i);
      }
    }

    return {
      type,
      boardSquareIds,
    };
  }

  public mergeHotels(minority: HotelChainType, majority: HotelChainType) {
    const majorityBoardState = BoardSquareStateType.HasHotelChain(majority);
    const mergerTile = this.squares.findIndex(
      (square, idx) =>
        square.type === "HasTile" &&
        this.getAdjacentHotelSquares(idx).length > 0
    );

    if (mergerTile === -1) {
      throw new Error("No merger tile found");
    }

    return this.update(mergerTile, majorityBoardState)
      .updateAll(this.getHotel(minority).boardSquareIds, majorityBoardState)
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

  private getAdjacentTiles(index: number): number[] {
    return this.getAdjacentIndices(index).filter(
      (idx) => this.squares[idx].type === "HasTile"
    );
  }

  private getAdjacentHotelSquares(index: number): number[] {
    return this.getAdjacentIndices(index).filter(
      (idx) => this.squares[idx].type === "HasHotelChain"
    );
  }
}
