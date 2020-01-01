import { getIndex } from "../src/engine/utils";
import {
  BoardSquareSelectedState,
  BoardSquareSelectedStateType,
  Confirmed,
  Unconfirmed
} from "../src/model/board-square-state";
import { HotelChainType } from "../src/model/hotel-chain-type";
import { IShares } from "../src/model/shares";
import { PlayerTurnFactory } from "./factory/player-turn.factory";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

export const turn = (
  playerId: number,
  selection: BoardSquareSelectedState,
  sharesPurchased: IShares[] = [],
  selectedHotelChain?: HotelChainType
) =>
  PlayerTurnFactory.createPlayerTurn({
    boardSquareSelectedState: selection,
    playerId,
    selectedHotelChain,
    sharesPurchased
  });

export const player = (playerId: number) => playerId;

export const starts = (hotel: HotelChainType) => hotel;

export const plays = (tilePosition: string) => tilePlacedAt(tilePosition);

export const buys = (shares: IShares[]) => shares;

export const america = (quantity: number): IShares => ({
  hotel: HotelChainType.AMERICAN,
  quantity
});

export const imererial = (quantity: number): IShares => ({
  hotel: HotelChainType.IMPERIAL,
  quantity
});

export const continental = (quantity: number): IShares => ({
  hotel: HotelChainType.CONTINENTAL,
  quantity
});

export const getTilePosition = (tileLabel: string): number => {
  const letter = tileLabel.charAt(tileLabel.length - 1);
  const num = tileLabel.replace(letter, "");

  return getIndex(Number.parseInt(num, 10) - 1, letters.indexOf(letter));
};

export const tilePlacedAt = (tileLabel: string): Confirmed =>
  BoardSquareSelectedStateType.Confirmed(getTilePosition(tileLabel));

export const tileSelectedAt = (tileLabel: string): Unconfirmed =>
  BoardSquareSelectedStateType.Unconfirmed(getTilePosition(tileLabel));
