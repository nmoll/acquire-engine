import { HotelChainType } from ".";
import { AvailableShares } from "./available-shares.type";

export interface ChooseTile {
  type: "ChooseTile";
}

export interface ChooseHotelChain {
  type: "ChooseHotelChain";
  hotelChains: HotelChainType[];
}

export interface ChooseShares {
  type: "ChooseShares";
  availableShares: AvailableShares;
}

export interface ChooseMergeDirection {
  type: "ChooseMergeDirection";
  options: HotelChainType[];
}

export interface ChooseEndTurn {
  type: "ChooseEndTurn";
}

export type AvailableAction =
  | ChooseTile
  | ChooseHotelChain
  | ChooseShares
  | ChooseMergeDirection
  | ChooseEndTurn;

export const AvailableActionType = {
  ChooseTile: (): ChooseTile => ({
    type: "ChooseTile",
  }),
  ChooseHotelChain: (hotelChains: HotelChainType[]): ChooseHotelChain => ({
    type: "ChooseHotelChain",
    hotelChains,
  }),
  ChooseShares: (availableShares: AvailableShares): ChooseShares => ({
    type: "ChooseShares",
    availableShares,
  }),
  ChooseMergeDirection: (options: HotelChainType[]): ChooseMergeDirection => ({
    type: "ChooseMergeDirection",
    options,
  }),
  ChooseEndTurn: (): ChooseEndTurn => ({
    type: "ChooseEndTurn",
  }),
};
