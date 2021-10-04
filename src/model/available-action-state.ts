import { AvailableAction } from "./available-action";

export interface IAvailableActionState {
  [playerId: number]: AvailableAction[];
}
