import { IGameState } from "../../src/model/game-state";

export const createGameState = (state: Partial<IGameState>): IGameState => ({
  boardState: [],
  cashState: {},
  currentPlayerIdState: null,
  sharesState: {},
  tileState: {},

  ...state,
});
