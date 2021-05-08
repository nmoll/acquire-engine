import { BoardSquareState } from "./board-square-state";
import { PlayerAction } from "./player-action";

export interface PlayerActionContext {
  index: number;
  playerAction: PlayerAction;
  boardState: BoardSquareState[];
}
