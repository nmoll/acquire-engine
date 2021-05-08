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

export interface ChooseMergeDirection {
  type: "ChooseMergeDirection";
  playerId: number;
  hotelChainToKeep: HotelChainType;
}

export type PlayerAction =
  | PlaceTile
  | StartHotelChain
  | PurchaseShares
  | ChooseMergeDirection;

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

  ChooseMergeDirection: (
    playerId: number,
    hotelChainToKeep: HotelChainType
  ): ChooseMergeDirection => ({
    type: "ChooseMergeDirection",
    playerId,
    hotelChainToKeep,
  }),
};
