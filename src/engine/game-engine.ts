import { IGameState, IPlayerTurn } from "../model";

const computeGameState = (playerTurns: IPlayerTurn[]): IGameState => {
  return {
    boardState: [],
    sharesState: {}
  };
};

export const AcquireEngine = {
  computeGameState
};
