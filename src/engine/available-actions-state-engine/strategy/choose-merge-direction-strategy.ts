import {
  AvailableAction,
  AvailableActionType,
} from "../../../model/available-action";
import { AvailableActionStrategy } from "./available-action-strategy";
import { AvailablActionStrategyContext } from "./available-action-strategy-context";

export class ChooseMergeDirectionStrategy implements AvailableActionStrategy {
  constructor(private context: AvailablActionStrategyContext) {}

  public isRequired(): boolean {
    return true;
  }

  public getAvailableActions(): AvailableAction[] {
    const actionResult = this.context.turnContext.actionResult;

    if (actionResult.type === "Merge Initiated") {
      return [
        AvailableActionType.ChooseMergeDirection(
          actionResult.hotels.map((hotel) => hotel.type)
        ),
      ];
    }

    return [];
  }
}
