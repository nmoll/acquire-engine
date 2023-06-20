import { AvailableAction } from "../../../model/available-action";

export interface AvailableActionStrategy {
  isRequired(): boolean;
  getAvailableActions(): AvailableAction[];
}
