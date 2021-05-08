import { BoardSquareState } from "./board-square-state";
import { PlayerAction } from "./player-action";
import { IPlayerTurn } from "./player-turn";

export interface PlayerTurnContext {
  type: "turn";
  index: number;
  playerTurn: IPlayerTurn;
  boardState: BoardSquareState[];
}

export interface PlayerActionContext {
  type: "action";
  index: number;
  playerAction: PlayerAction;
  boardState: BoardSquareState[];
}

export type IBoardSquareStateContext = PlayerTurnContext | PlayerActionContext;
