import { createContext } from "@lit/context";
import { PlayerStore } from "../state/player/player.store";

export const playerStoreContext = createContext<PlayerStore>('playerStore');