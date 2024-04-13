import { MockLocalStorage } from "../../../test/mocks/local-storage.mock";
import { PlayerStore } from "../../state/player/player.store";
import { AcquireLoginElement } from "./acquire-login.element";
import { beforeEach, describe, expect, it } from "vitest";
import { playerStoreContext } from "../../context/player.store.context";
import { TestBed } from "../../test/test-bed";

describe(AcquireLoginElement.name, () => {
    let el: AcquireLoginElement;

    let mockLocalStorage: MockLocalStorage;

    let playerStore: PlayerStore;

    beforeEach(() => {
        mockLocalStorage = new MockLocalStorage();
        playerStore = new PlayerStore(mockLocalStorage)

        el = TestBed.configureTestingEnvironment({
            element: 'acquire-login',
            providers: [
                {
                    context: playerStoreContext,
                    initialValue: playerStore
                }
            ]
        });
    })

    it('should allow player to log in with username', () => {
        expect(playerStore.playerName.value).toEqual('')

        const input = el.shadowRoot?.querySelector('input');
        if (!input) {
            throw new Error('expected input to exist');
        }
        const submitButton = el.shadowRoot?.querySelector('button');
        if (!submitButton) {
            throw new Error('expected submit button to exist');
        }

        input.value = 'Player';
        submitButton.click();

        expect(playerStore.playerName.value).toEqual('Player')
    })
})