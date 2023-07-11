import { Hotel } from "./hotel";
import { HotelChainType } from "./hotel-chain-type";
import {
  EndGame,
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
  hotel: Hotel;
}

interface MergeInitiated {
  type: "Merge Initiated";
  action: PlaceTile;
  hotels: Hotel[];
}

interface HotelMerged {
  type: "Hotel Merged";
  action: PlaceTile | Merge;
  survivor: Hotel;
  dissolved: Hotel[];
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

interface GameEnded {
  type: "Game Ended";
  action: EndGame;
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
  | TurnEnded
  | GameEnded;

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
    hotel: Hotel
  ): HotelSizeIncreased => ({
    type: "Hotel Size Increased",
    action: PlayerActionType.PlaceTile(playerId, boardSquareId),
    hotel,
  }),
  MergeInitiated: (
    playerId: string,
    boardSquareId: number,
    hotels: Hotel[]
  ): MergeInitiated => ({
    type: "Merge Initiated",
    action: PlayerActionType.PlaceTile(playerId, boardSquareId),
    hotels,
  }),
  HotelMerged: (
    playerId: string,
    boardSquareId: number,
    survivor: Hotel,
    dissolved: Hotel[],
    cashAwarded: Record<string, number>
  ): HotelMerged => ({
    type: "Hotel Merged",
    action: PlayerActionType.PlaceTile(playerId, boardSquareId),
    survivor,
    dissolved,
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
  GameEnded: (playerId: string): GameEnded => ({
    type: "Game Ended",
    action: PlayerActionType.EndGame(playerId),
  }),
};
