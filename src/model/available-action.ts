import { HotelChainType } from ".";

export interface ChooseTile {
  type: "ChooseTile";
  available: number[];
  unavailable: number[];
}

export interface ChooseHotelChain {
  type: "ChooseHotelChain";
  hotelChains: HotelChainType[];
}

export interface ChooseShares {
  type: "ChooseShares";
  hotelChains: HotelChainType[];
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

export interface ChooseEndGame {
  type: "ChooseEndGame";
}

export type AvailableAction =
  | ChooseTile
  | ChooseHotelChain
  | ChooseShares
  | ChooseToSellOrphanedShare
  | ChooseToKeepOrphanedShare
  | ChooseToTradeOrphanedShare
  | ChooseMergeDirection
  | ChooseEndTurn
  | ChooseEndGame;

export const AvailableActionType = {
  ChooseTile: (tiles: {
    available: number[];
    unavailable: number[];
  }): ChooseTile => ({
    type: "ChooseTile",
    available: tiles.available,
    unavailable: tiles.unavailable,
  }),
  ChooseHotelChain: (hotelChains: HotelChainType[]): ChooseHotelChain => ({
    type: "ChooseHotelChain",
    hotelChains,
  }),
  ChooseShares: (hotelChains: HotelChainType[]): ChooseShares => ({
    type: "ChooseShares",
    hotelChains,
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
  ChooseEndGame: (): ChooseEndGame => ({
    type: "ChooseEndGame",
  }),
};
