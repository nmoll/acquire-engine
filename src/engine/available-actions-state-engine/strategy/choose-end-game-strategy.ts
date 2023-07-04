import {
  AvailableAction,
  AvailableActionType,
} from "../../../model/available-action";
import { HotelManager } from "../../../model/hotel-manager";
import { AvailableActionStrategy } from "./available-action-strategy";
import { AvailablActionStrategyContext } from "./available-action-strategy-context";

export class ChooseEndGameStrategy implements AvailableActionStrategy {
  private hotelManager: HotelManager;

  constructor(private context: AvailablActionStrategyContext) {
    this.hotelManager = new HotelManager(this.context.boardState);
  }

  isRequired(): boolean {
    return false;
  }

  public getAvailableActions(): AvailableAction[] {
    if (this.canEndGame()) {
      return [AvailableActionType.ChooseEndGame()];
    }

    return [];
  }

  /**
   * A game can be ended if 1 hotel has reached the game ending size,
   * or all companies are safe.
   */
  private canEndGame(): boolean {
    const activeHotels = this.hotelManager.getActiveHotels();
    if (!activeHotels.length) {
      return false;
    }

    return (
      activeHotels.some((hotel) => hotel.isGameEndingSize()) ||
      activeHotels.every((hotel) => hotel.isSafe())
    );
  }
}
