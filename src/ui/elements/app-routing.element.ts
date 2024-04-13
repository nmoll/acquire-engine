import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./create-game/acquire-create-game.element";
import "./login/acquire-login.element";
import "./waiting-room/acquire-waiting-room.element";
import "./game/game-loading.element";
import "./game/acquire-game.element";
import "./game/game-not-found.element";
import { consume } from "@lit/context";
import { playerStoreContext } from "../context/player.store.context";
import { PlayerStore } from "../state/player/player.store";
import { SignalWatcher } from "@lit-labs/preact-signals";
import { GameStore } from "../state/game/game.store";
import { gameStoreContext } from "../context/game.store.context";

@customElement("acquire-app-routing")
export class AcquireAppRouting extends SignalWatcher(LitElement) {
    static styles = css`
    :host {
      height: 100%;
    }
  `;

    @consume({ context: playerStoreContext })
    playerStore!: PlayerStore;

    @consume({ context: gameStoreContext })
    gameStore!: GameStore;

    render() {
        const playerId = this.playerStore.playerId.value;
        if (!playerId) {
            return html`<acquire-login />`;
        }

        const gameState = this.gameStore.gameLoadedState.value;
        switch (gameState.type) {
            case "initial":
                return html`<acquire-create-game />`;
            case "loading":
                return html`<acquire-game-loading />`;
            case "not found":
                return html`<acquire-game-not-found />`;
            case "loaded":
                switch (gameState.game.state) {
                    case "not started":
                        return html`<acquire-waiting-room />`;
                    case "started":
                        return html`<acquire-game
              .game="${gameState.game}"
            />`;
                }
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "acquire-app-routing": AcquireAppRouting;
    }
}
