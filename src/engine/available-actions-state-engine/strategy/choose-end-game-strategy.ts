import { HotelChainType } from "../../../model";
import {
  AvailableAction,
  AvailableActionType,
} from "../../../model/available-action";
import { HotelChainUtils } from "../../../utils/hotel-chain-utils";
import { AvailableActionStrategy } from "./available-action-strategy";
import { AvailablActionStrategyContext } from "./available-action-strategy-context";

export class ChooseEndGameStrategy implements AvailableActionStrategy {
  constructor(private context: AvailablActionStrategyContext) {}

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
    const activeHotelChains = HotelChainUtils.getActiveHotelChains(
      this.context.boardState
    );

    const canEndGame =
      this.isAnyHotelChainGameEndingSize(activeHotelChains) ||
      this.isAllHotelChainsSafe(activeHotelChains);

    return canEndGame;
  }

  private isAnyHotelChainGameEndingSize(
    hotelChains: HotelChainType[]
  ): boolean {
    return hotelChains.some((hotelChain) =>
      HotelChainUtils.isGameEndingSize(hotelChain, this.context.boardState)
    );
  }

  private isAllHotelChainsSafe(hotelChains: HotelChainType[]): boolean {
    return (
      hotelChains.length > 0 &&
      hotelChains.every((hotelChain) =>
        HotelChainUtils.isSafe(hotelChain, this.context.boardState)
      )
    );
  }
}
