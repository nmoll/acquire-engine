import { TileUtils } from "../../utils/tile-utils";

export const formatTile = (index: number): string => {
  return `[${TileUtils.getTileDisplay(index)}]`;
};
