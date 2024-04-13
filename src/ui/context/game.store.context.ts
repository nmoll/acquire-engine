import { createContext } from "@lit/context";
import { GameStore } from "../state/game/game.store";

export const gameStoreContext = createContext<GameStore>('gameStore');