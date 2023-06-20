import { GameConfig } from "../../../game-config";
import {
  AvailableAction,
  AvailableActionType,
} from "../../../model/available-action";
import { AvailableShares } from "../../../model/available-shares.type";
import { HotelChainUtils } from "../../../utils/hotel-chain-utils";
import { SharesUtils } from "../../../utils/shares-utils";
import { AvailableActionStrategy } from "./available-action-strategy";
import { AvailablActionStrategyContext } from "./available-action-strategy-context";

export class ChooseSharesStrategy implements AvailableActionStrategy {
  constructor(private context: AvailablActionStrategyContext) {}

  public isRequired(): boolean {
    return false;
  }

  public getAvailableActions(): AvailableAction[] {
    const availableShares = this.getSharesAvailableToPurchase();

    if (!availableShares) {
      return [];
    }

    return [AvailableActionType.ChooseShares(availableShares)];
  }

  private hasPurchasedMaxShares(): boolean {
    let purchasedShares = this.context.turnContext.turnLog.filter(
      (log) => log.action.type === "PurchaseShares"
    ).length;

    if (this.context.turnContext.actionResult.type === "Shares Purchased") {
      purchasedShares++;
    }

    return purchasedShares >= GameConfig.turn.maxShares;
  }

  private getSharesAvailableToPurchase(): AvailableShares | null {
    if (this.hasPurchasedMaxShares()) {
      return null;
    }

    const hotelChainState = HotelChainUtils.getHotelChainState(
      this.context.boardState,
      this.context.sharesState
    );

    if (!Object.keys(hotelChainState).length) {
      return null;
    }

    return SharesUtils.getAvailableSharesForPurchase(
      hotelChainState,
      this.context.cashState[this.context.currentPlayerId] ?? 0
    );
  }
}
