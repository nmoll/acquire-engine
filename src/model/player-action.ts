import { HotelChainType } from "./hotel-chain-type";
import { IShares } from "./shares";

export interface PlaceTile {
  type: "PlaceTile";
  playerId: number;
  boardSquareId: number;
}

export interface StartHotelChain {
  type: "StartHotelChain";
  playerId: number;
  hotelChain: HotelChainType;
}

export interface PurchaseShares {
  type: "PurchaseShares";
  playerId: number;
  shares: IShares[];
}

export interface Merge {
  type: "Merge";
  playerId: number;
  hotelChainToKeep: HotelChainType;
}

export interface EndTurn {
  type: "EndTurn";
  playerId: number;
}

export type PlayerAction =
  | PlaceTile
  | StartHotelChain
  | PurchaseShares
  | Merge
  | EndTurn;

export const PlayerActionType = {
  PlaceTile: (playerId: number, boardSquareId: number): PlaceTile => ({
    type: "PlaceTile",
    playerId,
    boardSquareId,
  }),
  StartHotelChain: (
    playerId: number,
    hotelChain: HotelChainType
  ): StartHotelChain => ({
    type: "StartHotelChain",
    playerId,
    hotelChain,
  }),

  PurchaseShares: (playerId: number, shares: IShares[]): PurchaseShares => ({
    type: "PurchaseShares",
    playerId,
    shares,
  }),

  Merge: (playerId: number, hotelChainToKeep: HotelChainType): Merge => ({
    type: "Merge",
    playerId,
    hotelChainToKeep,
  }),

  EndTurn: (playerId: number): EndTurn => ({
    type: "EndTurn",
    playerId,
  }),
};
