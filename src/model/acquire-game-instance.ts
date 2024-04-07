import { AcquireGameState } from "./acquire-game-state";

export interface IAcquireGameInstance {
  id: string;
  randomSeed: number;
  playerIds: string[];
  hostId: string;
  state: AcquireGameState;
  isOpen?: boolean;
  createdDate?: number;
}
