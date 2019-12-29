import { BoardSquareSelectedState } from "./board-square-state";
import { HotelChainType } from "./hotel-chain-type";
import { IShares } from "./shares";

export interface IPlayerTurn {
  playerId: number;
  seq: number;
  boardSquareOptionIds: number[];
  boardSquareSelectedState: BoardSquareSelectedState;
  selectedHotelChain?: HotelChainType;
  sharesPurchased?: IShares[];
  sharesSold?: IShares[];
}
