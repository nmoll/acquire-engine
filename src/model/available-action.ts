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

export interface ChooseToSellOrphanedShare {
  type: "ChooseToSellOrphanedShare";
  hotelChain: HotelChainType;
  remainingShares: number;
}

export interface ChooseToKeepOrphanedShare {
  type: "ChooseToKeepOrphanedShare";
  hotelChain: HotelChainType;
  remainingShares: number;
}

export interface ChooseToTradeOrphanedShare {
  type: "ChooseToTradeOrphanedShare";
  hotelChain: HotelChainType;
  hotelChainToReceive: HotelChainType;
  remainingShares: number;
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
  | ChooseToSellOrphanedShare
  | ChooseToKeepOrphanedShare
  | ChooseToTradeOrphanedShare
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
  ChooseToSellOrphanedShare: (
    hotelChain: HotelChainType,
    remainingShares: number
  ): ChooseToSellOrphanedShare => ({
    type: "ChooseToSellOrphanedShare",
    hotelChain,
    remainingShares,
  }),
  ChooseToKeepOrphanedShare: (
    hotelChain: HotelChainType,
    remainingShares: number
  ): ChooseToKeepOrphanedShare => ({
    type: "ChooseToKeepOrphanedShare",
    hotelChain,
    remainingShares,
  }),
  ChooseToTradeOrphanedShare: (
    hotelChain: HotelChainType,
    hotelChainToReceive: HotelChainType,
    remainingShares: number
  ): ChooseToTradeOrphanedShare => ({
    type: "ChooseToTradeOrphanedShare",
    hotelChain,
    hotelChainToReceive,
    remainingShares,
  }),
  ChooseMergeDirection: (options: HotelChainType[]): ChooseMergeDirection => ({
    type: "ChooseMergeDirection",
    options,
  }),
  ChooseEndTurn: (): ChooseEndTurn => ({
    type: "ChooseEndTurn",
  }),
};
