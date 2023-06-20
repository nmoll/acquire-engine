import { BoardSquareState, ISharesState } from "../../../model";
import { ICashState } from "../../../model/cash-state";
import { ITileState } from "../../../model/tile-state";
import { TurnContext } from "../../../model/turn-context";

export interface AvailablActionStrategyContext {
  boardState: BoardSquareState[];
  sharesState: ISharesState;
  cashState: ICashState;
  tileState: ITileState;
  currentPlayerId: string;
  turnContext: TurnContext;
}
