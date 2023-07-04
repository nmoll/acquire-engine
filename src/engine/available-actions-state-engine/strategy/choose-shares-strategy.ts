import { GameConfig } from "../../../game-config";
import { HotelChainType } from "../../../model";
import {
  AvailableAction,
  AvailableActionType,
} from "../../../model/available-action";
import { HotelManager } from "../../../model/hotel-manager";
import { StockBroker } from "../../../model/stock-broker";
import { AvailableActionStrategy } from "./available-action-strategy";
import { AvailablActionStrategyContext } from "./available-action-strategy-context";

export class ChooseSharesStrategy implements AvailableActionStrategy {
  private hotelManager: HotelManager;
  private stockBroker: StockBroker;

  constructor(private context: AvailablActionStrategyContext) {
    this.hotelManager = new HotelManager(context.boardState);
    this.stockBroker = new StockBroker(context.sharesState);
  }

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

  private getSharesAvailableToPurchase(): HotelChainType[] | null {
    if (this.hasPurchasedMaxShares()) {
      return null;
    }

    const playerCash =
      this.context.cashState[this.context.currentPlayerId] ?? 0;

    const available = this.hotelManager.getActiveHotels().filter((hotel) => {
      return (
        this.stockBroker.getAvailableShares(hotel.type) > 0 &&
        playerCash >= hotel.getSharesCost()
      );
    });

    if (!available.length) {
      return null;
    }

    return available.map((hotel) => hotel.type);
  }
}
