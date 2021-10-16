import { IAcquireGameInstance } from "../../model/acquire-game-instance";

export const createGameInstance = (
  instance: Partial<IAcquireGameInstance>
): IAcquireGameInstance => ({
  id: "",
  playerIds: [],
  randomSeed: 1,
  hostId: "",
  state: "not started",

  ...instance,
});
