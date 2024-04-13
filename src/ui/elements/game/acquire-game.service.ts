import { AcquireGameBoardElement } from "./acquire-game-board.element";
import { AcquireGameElement } from "./acquire-game.element";
import { AcquireGameActionsElement } from "./actions/acquire-game-actions.element";

export class AcquireGameService {
  private static _instance = new AcquireGameService();

  public game: AcquireGameElement | null = null;
  public gameBoard: AcquireGameBoardElement | null = null;
  public gameActions: AcquireGameActionsElement | null = null;

  private constructor() {}

  public static getInstance() {
    return this._instance;
  }

  public setGame(game: AcquireGameElement) {
    this.game = game;
  }

  public setGameBoard(gameBoard: AcquireGameBoardElement) {
    this.gameBoard = gameBoard;
  }

  public setGameActions(gameActions: AcquireGameActionsElement) {
    this.gameActions = gameActions;
  }
}
