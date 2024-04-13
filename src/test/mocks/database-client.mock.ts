import { DatabaseClient } from "../../db/database-client";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerAction } from "../../model/player-action";

export class MockDatabaseClient implements DatabaseClient {
    private callbacks = new Map<string, Function>;

    getGame(gameId: string, callback: (game: IAcquireGameInstance | null) => void) {
        this.callbacks.set(`getGame-${gameId}`, callback);
    }

    createGame(_game: IAcquireGameInstance): void { }

    deleteGame(gameId: string, callback?: (() => void) | undefined): void {
        if (callback) {
            this.callbacks.set(`deleteGame-${gameId}`, callback)
        }
    }

    updateGameInstance(_instance: IAcquireGameInstance) { }

    onActionsChanged(gameId: string, callback: (actions: PlayerAction[]) => void): void {
        this.callbacks.set(`onActionsChanged-${gameId}`, callback);
    }

    onGameChanged(gameId: string, callback: (game: IAcquireGameInstance | null) => void): void {
        this.callbacks.set(`onGameChanged-${gameId}`, callback);
    }

    updateActions(gameId: string, actions: PlayerAction[]): void {
        const callback = this.callbacks.get(`onActionsChanged-${gameId}`);
        if (!callback) {
            throw new Error(`Expected callback for onActionsChanged with gameId: ${gameId}`);
        }

        callback(actions);
    }

    mockGetGameResponse(gameId: string, game: IAcquireGameInstance | null) {
        const callback = this.callbacks.get(`getGame-${gameId}`);
        if (!callback) {
            throw new Error(`Expected callback for getGame with gameId: ${gameId}`);
        }

        callback(game);
    }

    mockNotifyGameChanged(gameId: string, game: IAcquireGameInstance | null) {
        const callback = this.callbacks.get(`onGameChanged-${gameId}`);
        if (!callback) {
            throw new Error(`Expected callback for onGameChanged with gameId: ${gameId}`);
        }

        callback(game);
    }

    mockNotifyActionsChanged(gameId: string, actions: PlayerAction[]) {
        const callback = this.callbacks.get(`onActionsChanged-${gameId}`);
        if (!callback) {
            throw new Error(`Expected callback for onActionsChanged with gameId: ${gameId}`);
        }

        callback(actions);
    }

    mockDeleteGameResponse(gameId: string) {
        const callback = this.callbacks.get(`deleteGame-${gameId}`);
        if (!callback) {
            throw new Error(`Expected callback for deleteGame with gameId: ${gameId}`);
        }

        callback();
    }

}