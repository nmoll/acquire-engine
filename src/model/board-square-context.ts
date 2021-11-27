import { HotelChainType } from ".";

export interface BoardSquareContext {
  boardSquareId: number;
  adjacentTiles: number[];
  adjacentHotelChains: HotelChainType[];
}
