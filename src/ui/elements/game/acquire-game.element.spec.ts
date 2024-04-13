import { beforeEach, describe, expect, it } from "vitest";
import { AcquireGameElement } from "./acquire-game.element";
import { TestBed } from "../../test/test-bed";
import { PlayerStore } from "../../state/player/player.store";
import { MockLocalStorage } from "../../../test/mocks/local-storage.mock";
import { playerStoreContext } from "../../context/player.store.context";
import { GameStore } from "../../state/game/game.store";
import { MockWindowService } from "../../../test/mocks/window-service.mock";
import { MockDatabaseClient } from "../../../test/mocks/database-client.mock";
import { gameStoreContext } from "../../context/game.store.context";
import { GameHarness } from "../../test/harness/game.harness";
import { BoardStateFactory } from "../../../test/factory/board-state.factory";
import { GameSeedGenerator } from "../../state/game/game-seed-generator";
import { tile } from "../../../test/helpers";

class MockGameSeedGenerator implements GameSeedGenerator {
    generateSeed(): number {
        return 1;
    }
}

describe(AcquireGameElement.name, () => {
    let el: AcquireGameElement;
    let playerStore: PlayerStore;
    let gameStore: GameStore;

    let mockDatabaseClient: MockDatabaseClient;

    beforeEach(() => {
        mockDatabaseClient = new MockDatabaseClient();

        playerStore = new PlayerStore(new MockLocalStorage());
        gameStore = new GameStore(
            new MockWindowService(),
            mockDatabaseClient,
            new MockGameSeedGenerator()
        );

        el = TestBed.configureTestingEnvironment({
            element: 'acquire-game',
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

    it('should successfully play a turn', async () => {
        const playerId = playerStore.login('Player 1');
        gameStore.createNewGame(playerId);
        gameStore.addPlayer('2_Player 2');
        gameStore.setIsOpen(true);
        gameStore.startGame();

        await el.updateComplete

        const game = new GameHarness(el);
        const players = game.getPlayersHarness()
        const board = game.getBoardHarness()
        const actions = game.getActionsHarness();

        expect(await players.getPlayerHoldings()).toEqual([
            ["Player 1", "$6000", ["0", "0", "0", "0", "0", "0", "0"]],
            ["Player 2", "$6000", ["0", "0", "0", "0", "0", "0", "0"]],
        ])

        expect(await board.getBoardState()).toEqual(
            BoardStateFactory.createBoardState(
                `
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
              `
            )
        );

        expect(await actions.getChooseTileMessage()).toEqual('Select a tile on the board highlighted in green')

        await board.clickSquare(tile('12A'));

        expect(await actions.getChooseTileMessage()).toContain('Place Tile 12A')

        await actions.clickPlaceTile()

        expect(await board.getBoardState()).toEqual(
            BoardStateFactory.createBoardState(
                `
                - - - - - - - - - - - 0
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
                - - - - - - - - - - - -
              `
            )
        );

        await actions.clickEndTurn();

        expect(await actions.getAvailableActionText()).toEqual('Waiting for Player 2 to move')

    })
})