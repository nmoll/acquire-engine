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
