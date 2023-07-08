export class CancelTilePlaceEvent extends CustomEvent<void> {}

export const createCancelTilePlaceEvent = () =>
  new CancelTilePlaceEvent("cancel-tile-place");
