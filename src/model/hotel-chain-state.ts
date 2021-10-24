import { HotelChainType } from ".";

export type HotelChainState = Partial<
  Record<
    HotelChainType,
    {
      boardSquareIds: number[];
      availableShares: number;
    }
  >
>;
