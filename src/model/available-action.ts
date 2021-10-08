import { HotelChainType, ISharesState } from ".";

export interface ChooseTile {
  type: "ChooseTile";
}

export interface ChooseHotelChain {
  type: "ChooseHotelChain";
  hotelChains: HotelChainType[];
}

export interface ChooseShares {
  type: "ChooseShares";
  availableShares: ISharesState;
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
