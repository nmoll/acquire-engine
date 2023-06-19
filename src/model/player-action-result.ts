import { HotelChainType } from "./hotel-chain-type";
import {
  EndTurn,
  KeepOrphanedShare,
  Merge,
  PlaceTile,
  PlayerActionType,
  PurchaseShares,
  SellOrphanedShare,
  StartHotelChain,
  TradeOrphanedShare,
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

interface HotelMerged {
  type: "Hote Merged";
  action: PlaceTile | Merge;
  minority: {
    hotelChain: HotelChainType;
    size: number;
  };
  majority: {
    hotelChain: HotelChainType;
    size: number;
  };
  cashAwarded: Record<string, number>;
}

interface SharesPurchased {
  type: "Shares Purchased";
  action: PurchaseShares;
}

interface ShareSold {
  type: "Share Sold";
  action: SellOrphanedShare;
}

interface ShareKept {
  type: "Share Kept";
  action: KeepOrphanedShare;
}

interface ShareTraded {
  type: "Share Traded";
  action: TradeOrphanedShare;
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
  | HotelMerged
  | SharesPurchased
  | ShareSold
  | ShareKept
  | ShareTraded
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
  HotelMerged: (
    playerId: string,
    boardSquareId: number,
    minority: {
      hotelChain: HotelChainType;
      size: number;
    },
    majority: {
      hotelChain: HotelChainType;
      size: number;
    },
    cashAwarded: Record<string, number>
  ): HotelMerged => ({
    type: "Hote Merged",
    action: PlayerActionType.PlaceTile(playerId, boardSquareId),
    minority,
    majority,
    cashAwarded,
  }),
  SharesPurchased: (
    playerId: string,
    hotelChain: HotelChainType
  ): SharesPurchased => ({
    type: "Shares Purchased",
    action: PlayerActionType.PurchaseShares(playerId, hotelChain),
  }),
  ShareSold: (playerId: string, hotelChain: HotelChainType): ShareSold => ({
    type: "Share Sold",
    action: PlayerActionType.SellOrphanedShare(playerId, hotelChain),
  }),
  ShareKept: (playerId: string, hotelChain: HotelChainType): ShareKept => ({
    type: "Share Kept",
    action: PlayerActionType.KeepOrphanedShare(playerId, hotelChain),
  }),
  ShareTraded: (
    playerId: string,
    hotelChain: HotelChainType,
    hotelChainReceived: HotelChainType
  ): ShareTraded => ({
    type: "Share Traded",
    action: PlayerActionType.TradeOrphanedShare(
      playerId,
      hotelChain,
      hotelChainReceived
    ),
  }),
  TurnEnded: (playerId: string): TurnEnded => ({
    type: "Turn Ended",
    action: PlayerActionType.EndTurn(playerId),
  }),
};
