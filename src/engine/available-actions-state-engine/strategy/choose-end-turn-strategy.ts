import {
  AvailableAction,
  AvailableActionType,
} from "../../../model/available-action";
import { AvailableActionStrategy } from "./available-action-strategy";

export class ChooseEndTurnStrategy implements AvailableActionStrategy {
  constructor() {}

  public isRequired() {
    return false;
  }

  public getAvailableActions(): AvailableAction[] {
    return [AvailableActionType.ChooseEndTurn()];
  }
}
