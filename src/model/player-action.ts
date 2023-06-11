import { HotelChainType } from "./hotel-chain-type";

export interface PlaceTile {
  type: "PlaceTile";
  playerId: string;
  boardSquareId: number;
}

export interface StartHotelChain {
  type: "StartHotelChain";
  playerId: string;
  hotelChain: HotelChainType;
}

export interface PurchaseShares {
  type: "PurchaseShares";
  playerId: string;
  hotelChain: HotelChainType;
}

export interface SellOrphanedShare {
  type: "SellOrphanedShare";
  playerId: string;
  hotelChain: HotelChainType;
}

export interface KeepOrphanedShare {
  type: "KeepOrphanedShare";
  playerId: string;
  hotelChain: HotelChainType;
}

export interface TradeOrphanedShare {
  type: "TradeOrphanedShare";
  playerId: string;
  hotelChain: HotelChainType;
  hotelChainToReceive: HotelChainType;
}

export interface Merge {
  type: "Merge";
  playerId: string;
  hotelChainToKeep: HotelChainType;
}

export interface EndTurn {
  type: "EndTurn";
  playerId: string;
}

export type PlayerAction =
  | PlaceTile
  | StartHotelChain
  | PurchaseShares
  | SellOrphanedShare
  | KeepOrphanedShare
  | TradeOrphanedShare
  | Merge
  | EndTurn;

export const PlayerActionType = {
  PlaceTile: (playerId: string, boardSquareId: number): PlaceTile => ({
    type: "PlaceTile",
    playerId,
    boardSquareId,
  }),
  StartHotelChain: (
    playerId: string,
    hotelChain: HotelChainType
  ): StartHotelChain => ({
    type: "StartHotelChain",
    playerId,
    hotelChain,
  }),

  PurchaseShares: (
    playerId: string,
    hotelChain: HotelChainType
  ): PurchaseShares => ({
    type: "PurchaseShares",
    playerId,
    hotelChain,
  }),

  SellOrphanedShare: (
    playerId: string,
    hotelChain: HotelChainType
  ): SellOrphanedShare => ({
    type: "SellOrphanedShare",
    playerId,
    hotelChain,
  }),

  KeepOrphanedShare: (
    playerId: string,
    hotelChain: HotelChainType
  ): KeepOrphanedShare => ({
    type: "KeepOrphanedShare",
    playerId,
    hotelChain,
  }),

  TradeOrphanedShare: (
    playerId: string,
    hotelChain: HotelChainType,
    hotelChainToReceive: HotelChainType
  ): TradeOrphanedShare => ({
    type: "TradeOrphanedShare",
    playerId,
    hotelChain,
    hotelChainToReceive,
  }),

  Merge: (playerId: string, hotelChainToKeep: HotelChainType): Merge => ({
    type: "Merge",
    playerId,
    hotelChainToKeep,
  }),

  EndTurn: (playerId: string): EndTurn => ({
    type: "EndTurn",
    playerId,
  }),
};
