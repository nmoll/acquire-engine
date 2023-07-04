import {
  AvailableAction,
  AvailableActionType,
} from "../../../model/available-action";
import { Board } from "../../../model/board";
import { HotelManager } from "../../../model/hotel-manager";
import { AvailableActionStrategy } from "./available-action-strategy";
import { AvailablActionStrategyContext } from "./available-action-strategy-context";

export class ChooseHotelStrategy implements AvailableActionStrategy {
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
    if (this.hotelStarterPlayed()) {
      const inactiveHotels = this.hotelManager.getInactiveHotels();
      return [
        AvailableActionType.ChooseHotelChain(
          inactiveHotels.map((hotel) => hotel.type)
        ),
      ];
    }

    return [];
  }

  private hotelStarterPlayed(): boolean {
    const placedTile = this.getPlacedTile();

    if (placedTile === null) {
      return false;
    }

    return this.board.isHotelStarter(placedTile);
  }

  private getPlacedTile(): number | null {
    const action = this.context.turnContext.actionResult.action;
    return action.type === "PlaceTile" ? action.boardSquareId : null;
  }
}
