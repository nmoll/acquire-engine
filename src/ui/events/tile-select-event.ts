export class TileSelectEvent extends CustomEvent<{ tile: number }> {
  get tile() {
    return this.detail.tile;
  }
}

export const createTileSelectEvent = (tile: number) =>
  new TileSelectEvent("tile-select", {
    detail: {
      tile,
    },
  });
