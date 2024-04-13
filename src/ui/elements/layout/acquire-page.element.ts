import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PlayerUtils } from "../../../utils/player-utils";
import { consume } from "@lit/context";
import { playerStoreContext } from "../../context/player.store.context";
import { PlayerStore } from "../../state/player/player.store";
import { SignalWatcher } from '@lit-labs/preact-signals'

@customElement("acquire-page")
export class AcquirePageElement extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      width: 100%;
      max-width: 450px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem 1rem;
      box-sizing: border-box;
    }

    .header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      color: var(--colors-gray-300);
    }

    button {
      background: var(--colors-gray-800);
      border: var(--colors-gray-700);
      color: var(--colors-gray-400);
    }
  `;

  @property()
  title!: string;

  @consume({ context: playerStoreContext })
  playerStore!: PlayerStore;

  onLogout() {
    this.playerStore.logout();
    window.location.href = location.origin;
  }

  render() {
    const playerId = this.playerStore.playerId.value;

    return html`
      ${this.renderHeader(playerId)}
      <img src="logo_144x144.svg" />
      <h1>${this.title || "Acquire"}</h1>
      <slot></slot>
    `;
  }

  private renderHeader(playerId: string | null) {
    if (!playerId) {
      return;
    }

    return html`
      <div class="header">
        <span>Hello, ${PlayerUtils.getDisplayName(playerId)}!</span>
        <button @click="${() => this.onLogout()}">Logout</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-page": AcquirePageElement;
  }
}
