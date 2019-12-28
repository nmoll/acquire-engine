import { BoardSquareState } from ".";
import { ISharesState } from "./shares-state";

export interface IGameState {
  boardState: BoardSquareState[];
  sharesState: ISharesState;
}
