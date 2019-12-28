import { BoardSquareSelectedStateType } from "../../src/model/board-square-state";
import { IPlayerTurn } from "../../src/model/player-turn";

const createPlayerTurn = (props: Partial<IPlayerTurn>): IPlayerTurn => ({
  boardSquareOptionIds: [],
  boardSquareSelectedState: BoardSquareSelectedStateType.None(),
  playerId: 0,
  seq: 0,
  ...props
});

export const PlayerTurnFactory = {
  createPlayerTurn
};
