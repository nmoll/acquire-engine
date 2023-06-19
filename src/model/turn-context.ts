import { ActionLog } from "./action-log";
import { IGameState } from "./game-state";
import { HotelChainType } from "./hotel-chain-type";
import { Merge, PlaceTile } from "./player-action";
import { PlayerActionResult } from "./player-action-result";

export interface MergeContext {
  action: PlaceTile | Merge;
  gameState: IGameState;
  minority: {
    hotelChain: HotelChainType;
    size: number;
  };
  majority: {
    hotelChain: HotelChainType;
    size: number;
  };
}

export interface TurnContext {
  playerIds: string[];
  actionResult: PlayerActionResult;
  mergeContext: MergeContext | null;
  turnLog: ActionLog[];
}
