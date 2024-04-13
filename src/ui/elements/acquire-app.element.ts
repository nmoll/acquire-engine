import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { provide } from "@lit/context";
import { playerStoreContext } from "../context/player.store.context";
import { PlayerStore } from "../state/player/player.store";
import { SignalWatcher } from "@lit-labs/preact-signals";
import { GameStore } from "../state/game/game.store";
import { WindowService } from "../core/window/window-service";
import { GunDatabaseClient } from "../../db/database-client";
import { gameStoreContext } from "../context/game.store.context";
import "./app-routing.element"
import { RandomGameSeedGenerator } from "../state/game/game-seed-generator";

@customElement("acquire-app")
export class AcquireAppElement extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      height: 100%;
    }
  `;

  @provide({ context: playerStoreContext })
  playerStore = new PlayerStore(localStorage);

  @provide({ context: gameStoreContext })
  gameStore = new GameStore(
    new WindowService(),
    new GunDatabaseClient(),
    new RandomGameSeedGenerator()
  );

  render() {
    return html`<acquire-app-routing />`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-app": AcquireAppElement;
  }
}
