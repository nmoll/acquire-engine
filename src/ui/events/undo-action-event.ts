export class UndoActionEvent extends CustomEvent<void> {}

export const createUndoActionEvent = () =>
  new UndoActionEvent("undo-action", {});
