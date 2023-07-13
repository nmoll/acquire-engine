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

export const isTilePlacedResult = (a: PlayerActionResult): a is TilePlaced =>
  a.type === "Tile Placed";

interface HotelChainStarted {
  type: "Hotel Chain Started";
  action: StartHotelChain;
  boardSquareIds: number[];
}

export const isHotelChainStartedResult = (
  a: PlayerActionResult
): a is HotelChainStarted => a.type === "Hotel Chain Started";

interface HotelSizeIncreased {
  type: "Hotel Size Increased";
  action: PlaceTile;
  hotel: Hotel;
}

export const isHotelSizeIncreasedResult = (
  a: PlayerActionResult
): a is HotelSizeIncreased => a.type === "Hotel Size Increased";

interface MergeInitiated {
  type: "Merge Initiated";
  action: PlaceTile;
  hotels: Hotel[];
}

export const isMergeInitiatedResult = (
  a: PlayerActionResult
): a is MergeInitiated => a.type === "Merge Initiated";

interface HotelMerged {
  type: "Hotel Merged";
  action: PlaceTile | Merge;
  survivor: Hotel;
  dissolved: Hotel[];
  cashAwarded: Record<string, number>;
}

export const isHotelMergedResult = (a: PlayerActionResult): a is HotelMerged =>
  a.type === "Hotel Merged";

interface SharesPurchased {
  type: "Shares Purchased";
  action: PurchaseShares;
}

export const isSharesPurchasedResult = (
  a: PlayerActionResult
): a is SharesPurchased => a.type === "Shares Purchased";

interface ShareSold {
  type: "Share Sold";
  action: SellOrphanedShare;
}

export const isShareSoldResult = (a: PlayerActionResult): a is ShareSold =>
  a.type === "Share Sold";

interface ShareKept {
  type: "Share Kept";
  action: KeepOrphanedShare;
}

export const isShareKeptResult = (a: PlayerActionResult): a is ShareKept =>
  a.type === "Share Kept";

interface ShareTraded {
  type: "Share Traded";
  action: TradeOrphanedShare;
}

export const isShareTradedResult = (a: PlayerActionResult): a is ShareTraded =>
  a.type === "Share Traded";

interface TurnEnded {
  type: "Turn Ended";
  action: EndTurn;
}

export const isTurnEndedResult = (a: PlayerActionResult): a is TurnEnded =>
  a.type === "Turn Ended";

interface GameEnded {
  type: "Game Ended";
  action: EndGame;
}

export const isGameEndedResult = (a: PlayerActionResult): a is GameEnded =>
  a.type === "Game Ended";

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
