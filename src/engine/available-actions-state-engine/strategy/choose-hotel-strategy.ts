import {
  AvailableAction,
  AvailableActionType,
} from "../../../model/available-action";
import { HotelChainUtils } from "../../../utils/hotel-chain-utils";
import { AvailableActionStrategy } from "./available-action-strategy";
import { AvailablActionStrategyContext } from "./available-action-strategy-context";

export class ChooseHotelStrategy implements AvailableActionStrategy {
  constructor(private context: AvailablActionStrategyContext) {}

  public isRequired() {
    return true;
  }

  public getAvailableActions(): AvailableAction[] {
    if (this.hotelStarterPlayed()) {
      return [
        AvailableActionType.ChooseHotelChain(
          HotelChainUtils.getInactiveHotelChains(this.context.boardState)
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

    return HotelChainUtils.isHotelStarter(this.context.boardState, placedTile);
  }

  private getPlacedTile(): number | null {
    const action = this.context.turnContext.actionResult.action;
    return action.type === "PlaceTile" ? action.boardSquareId : null;
  }
}
