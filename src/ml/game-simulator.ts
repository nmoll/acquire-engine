import { GameStateEngine } from "../engine/game-state-engine/game-state-engine";
import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerAction } from "../model/player-action";
import { Player } from "./aiPlayer";
import { BoardStateFactory } from '../test/factory/board-state.factory'

export class GameSimulator {
    constructor(private players: Player[]) { }

    simulate(numGames: number): Map<string, number> {
        const result = new Map<string, number>();
        let completedGames = 0;
        while (completedGames < numGames) {
            try {
                const winner = this.playSingleGame()
                // rotate player positions
                this.players = [...this.players.slice(1), this.players[0]];
                result.set(winner, (result.get(winner) ?? 0) + 1);
                completedGames++;
            } catch (e) {
                // console.log('failed to play game, retrying...')
            }
        }
        return result;
    }

    private playSingleGame(): string {
        const seed = Math.random()

        const gameInstance: IAcquireGameInstance = {
            id: `game-${seed}`,
            hostId: this.players[0].playerId,
            playerIds: this.players.map(p => p.playerId),
            randomSeed: seed,
            state: 'started'
        }

        let gameState = GameStateEngine.computeGameState(gameInstance, [])

        const playedActions: PlayerAction[] = [];

        while (!gameState.winners) {
            const player = this.players.find(p => p.playerId === gameState.currentPlayerIdState);
            if (!player) {
                throw new Error('no player found for id: ' + gameState.currentPlayerIdState);
            }
            try {
                playedActions.push(player.play(gameState, gameInstance));
            } catch (e) {
                console.log('could not play', BoardStateFactory.createDiagram(gameState.boardState))
                console.log(gameState.availableActionsState)
            }
            gameState = GameStateEngine.computeGameState(gameInstance, playedActions)
        }

        return gameState.winners[0];
    }
}