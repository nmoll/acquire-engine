import { HotelChainType } from "./hotel-chain-type";

export interface Default {
  type: "Default";
}

export interface HasTile {
  type: "HasTile";
}

export interface HasHotelChain {
  type: "HasHotelChain";
  hotelChainType: HotelChainType;
}

export type BoardSquareState = Default | HasTile | HasHotelChain;

export const BoardSquareStateType = {
  HasHotelChain: (hotelChainType: HotelChainType): HasHotelChain => ({
    hotelChainType,
    type: "HasHotelChain",
  }),
  HasTile: (): HasTile => ({
    type: "HasTile",
  }),
  Default: (): Default => ({
    type: "Default",
  }),
};

export interface Default {
  type: "Default";
}

export interface Unconfirmed {
  type: "Unconfirmed";
  boardSquareId: number;
}

export interface Confirmed {
  type: "Confirmed";
  boardSquareId: number;
}
