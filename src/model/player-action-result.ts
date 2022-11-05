import { HotelChainType } from "./hotel-chain-type";
import {
  EndTurn,
  Merge,
  PlaceTile,
  PlayerActionType,
  PurchaseShares,
  StartHotelChain,
} from "./player-action";

interface TilePlaced {
  type: "Tile Placed";
  action: PlaceTile;
}

interface HotelChainStarted {
  type: "Hotel Chain Started";
  action: StartHotelChain;
  boardSquareIds: number[];
}

interface HotelSizeIncreased {
  type: "Hotel Size Increased";
  action: PlaceTile;
  hotelChain: HotelChainType;
}

interface MergeInitiated {
  type: "Merge Initiated";
  action: PlaceTile;
  hotelChains: HotelChainType[];
}

interface HotelAutoMerged {
  type: "Hotel Auto Merged";
  action: PlaceTile;
  minorityHotelChain: HotelChainType;
  majorityHotelChain: HotelChainType;
}

interface HotelMergeDirectionDecided {
  type: "Hotel Merge Direction Decided";
  action: Merge;
}

interface SharesPurchased {
  type: "Shares Purchased";
  action: PurchaseShares;
}

interface TurnEnded {
  type: "Turn Ended";
  action: EndTurn;
}

export type PlayerActionResult =
  | TilePlaced
  | HotelChainStarted
  | HotelSizeIncreased
  | MergeInitiated
  | HotelAutoMerged
  | HotelMergeDirectionDecided
  | SharesPurchased
  | TurnEnded;

export const PlayerActionResult = {
  TilePlaced: (playerId: string, boardSquareId: number): TilePlaced => ({
    type: "Tile Placed",
    action: PlayerActionType.PlaceTile(playerId, boardSquareId),
  }),
  HotelChainStarted: (
    playerId: string,
    hotelChain: HotelChainType,
    boardSquareIds: number[]
  ): HotelChainStarted => ({
    type: "Hotel Chain Started",
    action: PlayerActionType.StartHotelChain(playerId, hotelChain),
    boardSquareIds,
  }),
  HotelSizeIncreased: (
    playerId: string,
    boardSquareId: number,
    hotelChain: HotelChainType
  ): HotelSizeIncreased => ({
    type: "Hotel Size Increased",
    action: PlayerActionType.PlaceTile(playerId, boardSquareId),
    hotelChain,
  }),
  MergeInitiated: (
    playerId: string,
    boardSquareId: number,
    hotelChains: HotelChainType[]
  ): MergeInitiated => ({
    type: "Merge Initiated",
    action: PlayerActionType.PlaceTile(playerId, boardSquareId),
    hotelChains,
  }),
  HotelAutoMerged: (
    playerId: string,
    boardSquareId: number,
    minorityHotelChain: HotelChainType,
    majorityHotelChain: HotelChainType
  ): HotelAutoMerged => ({
    type: "Hotel Auto Merged",
    action: PlayerActionType.PlaceTile(playerId, boardSquareId),
    majorityHotelChain,
    minorityHotelChain,
  }),
  HotelMergeDirectionDecided: (
    playerId: string,
    hotelChainToKeep: HotelChainType
  ): HotelMergeDirectionDecided => ({
    type: "Hotel Merge Direction Decided",
    action: PlayerActionType.Merge(playerId, hotelChainToKeep),
  }),
  SharesPurchased: (
    playerId: string,
    hotelChain: HotelChainType
  ): SharesPurchased => ({
    type: "Shares Purchased",
    action: PlayerActionType.PurchaseShares(playerId, hotelChain),
  }),
  TurnEnded: (playerId: string): TurnEnded => ({
    type: "Turn Ended",
    action: PlayerActionType.EndTurn(playerId),
  }),
};
