import { BoardSquareState } from ".";
import { ICashState } from "./cash-state";
import { ISharesState } from "./shares-state";

export interface IGameState {
  boardState: BoardSquareState[];
  sharesState: ISharesState;
  cashState: ICashState;
}
