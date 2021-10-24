import { IShares } from "../model/shares";
import { BoardUtils } from "../utils/board-utils";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

export const america = (quantity: number): IShares => ({
  hotel: "American",
  quantity,
});

export const continental = (quantity: number): IShares => ({
  hotel: "Continental",
  quantity,
});

export const tile = (tileLabel: string): number => {
  const letter = tileLabel.charAt(tileLabel.length - 1);
  const num = tileLabel.replace(letter, "");

  return BoardUtils.getIndex(
    Number.parseInt(num, 10) - 1,
    letters.indexOf(letter)
  );
};
