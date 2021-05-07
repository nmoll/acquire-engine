import { BoardSquareState } from "./board-square-state";
import { IPlayerTurn } from "./player-turn";

export interface IBoardSquareStateContext {
  index: number;
  playerTurn: IPlayerTurn;
  boardState: BoardSquareState[];
}
