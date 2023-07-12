export class ConfirmEvent extends CustomEvent<void> {}

export const createConfirmEvent = () => new ConfirmEvent("confirm");
