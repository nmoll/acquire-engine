import { BoardSquareState } from ".";
import { ICashState } from "./cash-state";
import { CurrentPlayerIdState } from "./current-player-id-state";
import { ISharesState } from "./shares-state";
import { ITileState } from "./tile-state";

export interface IGameState {
  boardState: BoardSquareState[];
  sharesState: ISharesState;
  cashState: ICashState;
  tileState: ITileState;
  currentPlayerIdState: CurrentPlayerIdState;
}
