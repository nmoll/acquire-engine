import { HotelChainType } from "./hotel-chain-type";

export interface None {
  type: "None";
}

export interface AvailableForSelection {
  type: "AvailableForSelection";
}

export interface Selected {
  type: "Selected";
}

export interface HasTile {
  type: "HasTile";
}

export interface PendingHotel {
  type: "PendingHotel";
}

export interface HasHotelChain {
  type: "HasHotelChain";
  hotelChainType: HotelChainType;
}

export type BoardSquareState =
  | None
  | AvailableForSelection
  | Selected
  | HasTile
  | PendingHotel
  | HasHotelChain;

export const BoardSquareStateType = {
  AvailableForSelection: (): AvailableForSelection => ({
    type: "AvailableForSelection"
  }),
  HasHotelChain: (hotelChainType: HotelChainType): HasHotelChain => ({
    hotelChainType,
    type: "HasHotelChain"
  }),
  HasTile: (): HasTile => ({
    type: "HasTile"
  }),
  None: (): None => ({
    type: "None"
  }),
  PendingHotel: (): PendingHotel => ({
    type: "PendingHotel"
  }),
  Selected: (): Selected => ({
    type: "Selected"
  })
};

export interface None {
  type: "None";
}

export interface Unconfirmed {
  type: "Unconfirmed";
  boardSquareId: number;
}

export interface Confirmed {
  type: "Confirmed";
  boardSquareId: number;
}

export type BoardSquareSelectedState = None | Unconfirmed | Confirmed;

export const BoardSquareSelectedStateType = {
  None: (): None => ({
    type: "None"
  }),
  Unconfirmed: (boardSquareId: number): Unconfirmed => ({
    type: "Unconfirmed",
    boardSquareId
  }),
  Confirmed: (boardSquareId: number): Confirmed => ({
    type: "Confirmed",
    boardSquareId
  })
};
