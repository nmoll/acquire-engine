import { HotelChainType } from "../../../model";
import {
  AvailableAction,
  AvailableActionType,
} from "../../../model/available-action";
import { StockBroker } from "../../../model/stock-broker";
import { ActionUtils } from "../../../utils/action-utils";
import { isDefined } from "../../../utils/is-defined-util";
import { SharesUtils } from "../../../utils/shares-utils";
import { AvailableActionStrategy } from "./available-action-strategy";
import { AvailablActionStrategyContext } from "./available-action-strategy-context";

export class ChooseOrphanedShareStrategy implements AvailableActionStrategy {
  private stockBroker: StockBroker;

  constructor(private context: AvailablActionStrategyContext) {
    this.stockBroker = new StockBroker(this.context.sharesState);
  }

  isRequired(): boolean {
    return true;
  }

  public getAvailableActions(): AvailableAction[] {
    const actionResult = this.context.turnContext.actionResult;

    let minorityHotelChain: HotelChainType;
    let majorityHotelChain: HotelChainType;
    let remainingShares: number;

    if (actionResult.type === "Hotel Merged") {
      const playerWithShares = SharesUtils.getNextPlayerWithOrphanedShares(
        this.context.sharesState,
        this.context.currentPlayerId,
        actionResult.minority.type,
        this.context.turnContext.turnLog
      );
      const numShares = playerWithShares
        ? this.context.sharesState[playerWithShares.playerId][
            actionResult.minority.type
          ]
        : null;

      if (!numShares) {
        return [];
      }

      minorityHotelChain = actionResult.minority.type;
      majorityHotelChain = actionResult.majority.type;
      remainingShares = numShares;
    } else if (
      actionResult.type === "Share Kept" ||
      actionResult.type === "Share Sold" ||
      actionResult.type === "Share Traded"
    ) {
      const mergeContext = this.context.turnContext.mergeContext;
      if (!mergeContext) {
        throw new Error("Expected to find merge context for current turn");
      }

      const playerWithUnresolvedShares =
        ActionUtils.findPlayerWithUnresolvedOrphanedShares(
          this.context.turnContext
        );

      if (!playerWithUnresolvedShares) {
        return [];
      }

      minorityHotelChain = mergeContext.minority.type;
      majorityHotelChain = mergeContext.majority.type;
      remainingShares = playerWithUnresolvedShares.shares;
    } else {
      return [];
    }

    const availableMajorityShares =
      this.stockBroker.getAvailableShares(majorityHotelChain);

    return [
      AvailableActionType.ChooseToSellOrphanedShare(
        minorityHotelChain,
        remainingShares
      ),
      AvailableActionType.ChooseToKeepOrphanedShare(
        minorityHotelChain,
        remainingShares
      ),
      remainingShares > 1 && availableMajorityShares >= 1
        ? AvailableActionType.ChooseToTradeOrphanedShare(
            minorityHotelChain,
            majorityHotelChain,
            remainingShares
          )
        : null,
    ].filter(isDefined);
  }
}
