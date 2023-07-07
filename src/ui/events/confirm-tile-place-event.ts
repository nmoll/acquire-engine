export class ConfirmTilePlaceEvent extends CustomEvent<void> {}

export const createConfirmTilePlaceEvent = () =>
  new ConfirmTilePlaceEvent("confirm-tile-place");
