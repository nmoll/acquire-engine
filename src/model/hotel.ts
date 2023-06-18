import { HotelChainType } from "./hotel-chain-type";

export interface Hotel<T extends HotelChainType> {
  type: T;
  boardSquareIds: number[];
}
