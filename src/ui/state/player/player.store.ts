import { Signal, computed, signal } from "@lit-labs/preact-signals";
import { LocalStorage } from "../../core/local-storage/local-storage";
import { PlayerUtils } from "../../../utils/player-utils";

const PLAYER_ID_KEY = "acquire-player-id";

export class PlayerStore {
    playerId: Signal<string | null>;
    playerName: Signal<string> = computed(() =>
        this.playerId.value ?
            PlayerUtils.getDisplayName(this.playerId.value) : ''
    );

    constructor(private localStorage: LocalStorage) {
        this.playerId = signal(this.localStorage.getItem(PLAYER_ID_KEY))
    }

    login(username: string): string {
        const playerId = PlayerUtils.assignId(username);
        this.playerId.value = playerId;
        this.localStorage.setItem(PLAYER_ID_KEY, playerId)
        return playerId;
    }

    logout() {
        this.playerId.value = null;
        this.localStorage.removeItem(PLAYER_ID_KEY);
    }
}