export class LeaveGameEvent extends CustomEvent<void> {}

export const createLeaveGameEvent = () => new LeaveGameEvent("leave-game", {});
