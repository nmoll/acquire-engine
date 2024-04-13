import { describe, expect, it, beforeEach } from "vitest";
import { AcquireAppRouting } from "./app-routing.element";
import { PlayerStore } from "../state/player/player.store";
import { playerStoreContext } from "../context/player.store.context";
import { GameStore } from "../state/game/game.store";
import { MockWindowService } from "../../test/mocks/window-service.mock";
import { MockDatabaseClient } from "../../test/mocks/database-client.mock";
import { gameStoreContext } from "../context/game.store.context";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { MockLocalStorage } from "../../test/mocks/local-storage.mock";
import { TestBed } from "../test/test-bed";
import { RandomGameSeedGenerator } from "../state/game/game-seed-generator";

describe(AcquireAppRouting.name, () => {
    let el: AcquireAppRouting;

    let mockLocalStorage: MockLocalStorage;
    let mockWindowService: MockWindowService;
    let mockDatabaseClient: MockDatabaseClient;

    let playerStore: PlayerStore
    let gameStore: GameStore;

    const getRenderedHtml = () => scrub(el.shadowRoot?.innerHTML ?? '')

    beforeEach(() => {
        mockLocalStorage = new MockLocalStorage();
        mockWindowService = new MockWindowService();
        mockDatabaseClient = new MockDatabaseClient();

        playerStore = new PlayerStore(mockLocalStorage);
        gameStore = new GameStore(
            mockWindowService,
            mockDatabaseClient,
            new RandomGameSeedGenerator()
        );

        el = TestBed.configureTestingEnvironment({
            element: 'acquire-app-routing',
            providers: [
                {
                    context: playerStoreContext,
                    initialValue: playerStore
                },
                {
                    context: gameStoreContext,
                    initialValue: gameStore
                }
            ]
        })
    })

    describe('Player not logged in', () => {
        it('should show login', async () => {
            expect(getRenderedHtml()).toEqual('<acquire-login></acquire-login>')
        });
    })

    describe('Player logged in', () => {
        beforeEach(async () => {
            playerStore.login('1_Player')
        })

        it('should show create game element if no game created', async () => {
            expect(getRenderedHtml()).toEqual('<acquire-create-game></acquire-create-game>');
        });

        it('should show loading when trying to connect to a game', async () => {
            gameStore.goToGame('game-1');
            el.requestUpdate()
            await el.updateComplete

            expect(getRenderedHtml()).toEqual('<acquire-game-loading></acquire-game-loading>');
        });

        it('should show not found when game is not found', async () => {
            gameStore.goToGame('game-1');

            mockWindowService.mockResolveTimeout();

            el.requestUpdate()
            await el.updateComplete

            expect(getRenderedHtml()).toEqual('<acquire-game-not-found></acquire-game-not-found>');
        });

        it('should show waiting room if game is found but not started', async () => {
            gameStore.goToGame('game-1');

            const game: IAcquireGameInstance = {
                id: '123',
                hostId: '1_Player',
                playerIds: ['1_Player'],
                randomSeed: 1,
                state: 'not started'
            }

            mockDatabaseClient.mockNotifyGameChanged('game-1', game)

            el.requestUpdate()
            await el.updateComplete

            expect(getRenderedHtml()).toEqual('<acquire-waiting-room></acquire-waiting-room>');
        });

        it('should show game if game is started', async () => {
            gameStore.goToGame('game-1');

            const game: IAcquireGameInstance = {
                id: '123',
                hostId: '1_Player',
                playerIds: ['1_Player', '2_Player'],
                randomSeed: 1,
                state: 'started'
            }

            mockDatabaseClient.mockNotifyGameChanged('game-1', game)

            el.requestUpdate()
            await el.updateComplete

            expect(getRenderedHtml()).toEqual('<acquire-game></acquire-game>');
        })
    })
})

const scrub = (html: string): string => html.replace('<!---->', '')