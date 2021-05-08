import { HotelChainType } from "../src/model/hotel-chain-type";
import { IShares } from "../src/model/shares";
import { Utils } from "../src/utils/utils";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

export const america = (quantity: number): IShares => ({
  hotel: HotelChainType.AMERICAN,
  quantity,
});

export const imperial = (quantity: number): IShares => ({
  hotel: HotelChainType.IMPERIAL,
  quantity,
});

export const continental = (quantity: number): IShares => ({
  hotel: HotelChainType.CONTINENTAL,
  quantity,
});

export const getTilePosition = (tileLabel: string): number => {
  const letter = tileLabel.charAt(tileLabel.length - 1);
  const num = tileLabel.replace(letter, "");

  return Utils.getIndex(Number.parseInt(num, 10) - 1, letters.indexOf(letter));
};
