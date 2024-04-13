import { expect, it, beforeEach, describe, vi } from "vitest";
import { GameStore } from "./game.store";
import { MockDatabaseClient } from "../../../test/mocks/database-client.mock";
import { IAcquireGameInstance } from "../../../model/acquire-game-instance";
import { GameLoadedState } from "../../model/game-loaded-state.model";
import { MockWindowService } from "../../../test/mocks/window-service.mock";
import { PlayerAction } from "../../../model/player-action";
import { RandomGameSeedGenerator } from "./game-seed-generator";

describe(GameStore.name, () => {
    let store: GameStore;
    let mockWindowService: MockWindowService;
    let mockDatabaseClient: MockDatabaseClient;

    const createGameStore = () => new GameStore(mockWindowService, mockDatabaseClient, new RandomGameSeedGenerator())

    const assertIsLoaded = (game: GameLoadedState) => {
        if (game.type !== 'loaded') {
            throw new Error(`Expected game state to be loaded, was: ${game.type}`)
        }
        return game;
    }

    beforeEach(() => {
        mockWindowService = new MockWindowService();
        mockDatabaseClient = new MockDatabaseClient();
    })

    describe('Game State', () => {
        it('should be "initial" if no game id query param exists', () => {
            store = createGameStore();
            expect(store.gameLoadedState.value).toEqual<GameLoadedState>({
                type: 'initial'
            })
        })

        it('should load game if game id query param exists', () => {
            mockWindowService.setQueryParam('game-id', '1');
            store = createGameStore();

            expect(store.gameLoadedState.value).toEqual<GameLoadedState>({
                type: 'loading'
            })

            const game: IAcquireGameInstance = {
                id: '1',
                hostId: 'player1',
                playerIds: ['player1', 'player2'],
                randomSeed: 1,
                state: 'not started',
            }
            mockDatabaseClient.mockNotifyGameChanged('1', game);

            const loadedState = assertIsLoaded(store.gameLoadedState.value);
            expect(loadedState.game).toEqual(game);
        })

        it('should be "not found" if game is not found after 5 seconds', () => {
            mockWindowService.setQueryParam('game-id', '1');
            store = createGameStore();

            expect(store.gameLoadedState.value).toEqual<GameLoadedState>({
                type: 'loading'
            })

            mockWindowService.mockResolveTimeout();

            expect(store.gameLoadedState.value).toEqual<GameLoadedState>({
                type: 'not found',
            })
        })

        it('should update state when game changes from an event', () => {
            store = createGameStore();

            store.createNewGame('1_Player');

            let gameState = assertIsLoaded(store.gameLoadedState.value);

            expect(gameState.game.playerIds).toEqual(['1_Player']);

            const updatedGame: IAcquireGameInstance = {
                ...gameState.game,
                playerIds: ['1_Player', '2_player']
            }
            mockDatabaseClient.mockNotifyGameChanged(gameState.game.id, updatedGame);

            gameState = assertIsLoaded(store.gameLoadedState.value);
            expect(gameState.game).toEqual(updatedGame);
        })
    })

    describe('Start New Game', () => {
        it('should create a new game', () => {
            vi.spyOn(mockWindowService, 'setQueryParam');
            vi.spyOn(mockDatabaseClient, 'createGame');

            store = createGameStore();

            expect(store.gameLoadedState.value.type).toEqual('initial');

            store.createNewGame('1_Player');

            const gameState = store.gameLoadedState.value;
            if (gameState.type !== 'loaded') {
                throw new Error(`Expected game state to be loaded, was: ${gameState.type}`);
            }
            expect(gameState.game.id).toBeDefined();
            expect(gameState.game.createdDate).toBeDefined();
            expect(gameState.game.hostId).toEqual('1_Player')
            expect(gameState.game.playerIds).toEqual(['1_Player'])
            expect(gameState.game.state).toEqual('not started');

            expect(mockWindowService.setQueryParam).toHaveBeenCalledWith('game-id', gameState.game.id);
            expect(mockDatabaseClient.createGame).toHaveBeenCalledWith(gameState.game)
        })
    })

    describe('Add Player', () => {
        it('should add player to game', () => {
            vi.spyOn(mockDatabaseClient, 'updateGameInstance');

            store = createGameStore();

            store.createNewGame('1_Player');
            store.addPlayer('2_Player');

            const gameState = store.gameLoadedState.value;
            if (gameState.type !== 'loaded') {
                throw new Error(`Expected game state to be loaded, was: ${gameState.type}`)
            }

            expect(gameState.game.playerIds).toEqual(['1_Player', '2_Player']);

            expect(mockDatabaseClient.updateGameInstance).toHaveBeenCalledWith(gameState.game);
        })
    })

    describe('Set Is Open', () => {
        it('should change is open option', () => {
            vi.spyOn(mockDatabaseClient, 'updateGameInstance');

            store = createGameStore();

            store.createNewGame('1_Player');

            let gameState = assertIsLoaded(store.gameLoadedState.value);
            expect(gameState.game.isOpen).toBeFalsy();

            store.setIsOpen(true);
            gameState = assertIsLoaded(store.gameLoadedState.value);
            expect(gameState.game.isOpen).toBeTruthy();
            expect(mockDatabaseClient.updateGameInstance).toHaveBeenCalledWith(gameState.game);

            store.setIsOpen(false);
            gameState = assertIsLoaded(store.gameLoadedState.value);
            expect(gameState.game.isOpen).toBeFalsy()
            expect(mockDatabaseClient.updateGameInstance).toHaveBeenCalledWith(gameState.game);
        })
    })

    describe('Start Game', () => {
        it('should start the game', () => {
            vi.spyOn(mockDatabaseClient, 'updateGameInstance');

            store = createGameStore();
            store.createNewGame('1_Player');

            let gameState = assertIsLoaded(store.gameLoadedState.value);
            expect(gameState.game.state).toEqual('not started');

            store.startGame();

            gameState = assertIsLoaded(store.gameLoadedState.value);
            expect(gameState.game.state).toEqual('started');
            expect(mockDatabaseClient.updateGameInstance).toHaveBeenCalledWith(gameState.game);
        })
    })

    describe('Delete Game', () => {
        it('should delete the game', async () => {
            vi.spyOn(mockWindowService, 'setQueryParam');

            store = createGameStore();
            store.createNewGame('1_Player');

            const gameState = assertIsLoaded(store.gameLoadedState.value);
            expect(gameState.type).toEqual('loaded');


            store.deleteGame();
            mockDatabaseClient.mockDeleteGameResponse(gameState.game.id);


            expect(store.gameLoadedState.value).toEqual<GameLoadedState>({
                type: 'initial'
            })

            expect(mockWindowService.setQueryParam).toHaveBeenCalledWith('game-id', null);
        })
    })

    describe('Go to Game', () => {
        it('should set game id query param and load game', () => {
            vi.spyOn(mockWindowService, 'setQueryParam')

            store = createGameStore();

            store.goToGame('123');

            expect(mockWindowService.setQueryParam).toHaveBeenCalledWith('game-id', '123')

            expect(store.gameLoadedState.value).toEqual<GameLoadedState>({
                type: 'loading'
            })

            const game: IAcquireGameInstance = {
                id: '1',
                hostId: '1_Player',
                playerIds: ['1_Player'],
                randomSeed: 1,
                state: 'not started'
            }

            mockDatabaseClient.mockNotifyGameChanged('123', game);

            expect(store.gameLoadedState.value).toEqual<GameLoadedState>({
                type: 'loaded',
                game
            })
        })
    })

    describe('Leave Game', () => {
        it('should clear query param and set state to initial', () => {
            vi.spyOn(mockWindowService, 'setQueryParam');

            store = createGameStore();

            store.createNewGame('1_Player');

            expect(store.gameLoadedState.value.type).toBe('loaded');

            store.leaveGame();

            expect(store.gameLoadedState.value.type).toBe('initial');
            expect(mockWindowService.setQueryParam).toHaveBeenCalledWith('game-id', null)
        })
    })

    describe('Watch Actions', () => {
        it('should return signal that updates when actions change', () => {
            store = createGameStore();

            const actions = store.watchActions('game-123');
            expect(actions.value).toEqual([]);

            mockDatabaseClient.mockNotifyActionsChanged('game-123', [
                {
                    type: 'PlaceTile',
                    playerId: '1_Player',
                    boardSquareId: 1
                }
            ]);

            expect(actions.value).toEqual<PlayerAction[]>([
                {
                    type: 'PlaceTile',
                    playerId: '1_Player',
                    boardSquareId: 1
                }
            ])


            mockDatabaseClient.mockNotifyActionsChanged('game-123', [
                {
                    type: 'PlaceTile',
                    playerId: '1_Player',
                    boardSquareId: 1
                },
                {
                    type: 'EndTurn',
                    playerId: '1_Player'
                }
            ]);

            expect(actions.value).toEqual<PlayerAction[]>([
                {
                    type: 'PlaceTile',
                    playerId: '1_Player',
                    boardSquareId: 1
                },
                {
                    type: 'EndTurn',
                    playerId: '1_Player'
                }
            ])
        })
    })
})