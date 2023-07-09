export class JoinGameEvent extends CustomEvent<{
  gameId: string | null;
}> {
  get gameId() {
    return this.detail.gameId;
  }
}

export const createJoinGameEvent = (gameId: string | null) =>
  new JoinGameEvent("join-game", {
    detail: {
      gameId,
    },
  });
