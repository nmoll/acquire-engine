export class EndTurnEvent extends CustomEvent<void> {}

export const createEndTurnEvent = () => new EndTurnEvent("end-turn");
