import { describe, expect, it, beforeEach } from "vitest";
import { PlayerStore } from "./player.store";
import { LocalStorage } from "../../core/local-storage/local-storage";

class MockLocalStorage implements LocalStorage {
    private storage = new Map<string, string>();

    setItem(key: string, value: string): void {
        this.storage.set(key, value);
    }

    getItem(key: string): string | null {
        return this.storage.get(key) ?? null;
    }

    removeItem(key: string): void {
        this.storage.delete(key);
    }
}

describe(PlayerStore.name, () => {
    let store: PlayerStore;
    let mockLocalStorage: LocalStorage;

    beforeEach(() => {
        mockLocalStorage = new MockLocalStorage();
    })

    describe('playerId', () => {
        describe('on init', () => {
            it('should be null if no player id', () => {
                store = new PlayerStore(mockLocalStorage);
                expect(store.playerId.value).toBeNull()
            });

            it('should initialize player id from local storage', () => {
                mockLocalStorage.setItem('acquire-player-id', '123_Player')

                store = new PlayerStore(mockLocalStorage);
                expect(store.playerId.value).toEqual('123_Player');
            });
        })

        it('should login', () => {
            store = new PlayerStore(mockLocalStorage);
            expect(store.playerId.value).toBeNull();

            store.login('Player');

            const playerId = store.playerId.value;
            expect(playerId).toBeDefined()

            // Recreate player store
            store = new PlayerStore(mockLocalStorage);

            // Assert: player id is remembered
            expect(store.playerId.value).toEqual(playerId);
        })

        it('should logout', () => {
            mockLocalStorage.setItem('acquire-player-id', '123_Player')

            store = new PlayerStore(mockLocalStorage);
            expect(store.playerId.value).toEqual('123_Player');
            store.logout();

            expect(store.playerId.value).toBeNull();
        })
    })

    describe('playerName', () => {
        it('should return player name', () => {
            store = new PlayerStore(mockLocalStorage);

            expect(store.playerName.value).toEqual("")
            store.login('Player');
            expect(store.playerName.value).toEqual('Player')
        })
    })
})