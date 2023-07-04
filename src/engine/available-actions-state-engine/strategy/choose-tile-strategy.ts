import {
  AvailableAction,
  AvailableActionType,
} from "../../../model/available-action";
import { Board } from "../../../model/board";
import { HotelManager } from "../../../model/hotel-manager";
import { AvailableActionStrategy } from "./available-action-strategy";
import { AvailablActionStrategyContext } from "./available-action-strategy-context";

export class ChooseTileStrategy implements AvailableActionStrategy {
  private board: Board;
  private hotelManager: HotelManager;

  constructor(private context: AvailablActionStrategyContext) {
    this.board = new Board(this.context.boardState);
    this.hotelManager = new HotelManager(this.context.boardState);
  }

  public isRequired() {
    return true;
  }

  public getAvailableActions(): AvailableAction[] {
    if (this.context.turnContext.actionResult.type === "Turn Ended") {
      return [
        AvailableActionType.ChooseTile(this.getAvailableAndUnavailableTiles()),
      ];
    }

    return [];
  }

  private getAvailableAndUnavailableTiles(): {
    available: number[];
    unavailable: number[];
  } {
    const available: number[] = [];
    const unavailable: number[] = [];

    const tiles = this.context.tileState[this.context.currentPlayerId];

    tiles.forEach((tile) => {
      if (this.isTilePlayable(tile)) {
        available.push(tile);
      } else {
        unavailable.push(tile);
      }
    });

    return {
      available,
      unavailable,
    };
  }

  private isTilePlayable(tile: number): boolean {
    if (
      this.board.isHotelStarter(tile) &&
      this.hotelManager.getInactiveHotels().length === 0
    ) {
      return false;
    }

    return true;
  }
}
