import { BoardSquareState } from ".";
import { IAvailableActionState } from "./available-action-state";
import { ICashState } from "./cash-state";
import { CurrentPlayerIdState } from "./current-player-id-state";
import { PlayerActionResult } from "./player-action-result";
import { ISharesState } from "./shares-state";
import { ITileState } from "./tile-state";

export interface IGameState {
  boardState: BoardSquareState[];
  sharesState: ISharesState;
  cashState: ICashState;
  tileState: ITileState;
  currentPlayerIdState: CurrentPlayerIdState;
  availableActionsState: IAvailableActionState;
  previousActions: PlayerActionResult[];
  winners?: string[] | null;
}
