import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AcquireAppService } from "./acquire-app.service";
import { PlayerUtils } from "../utils/player-utils";

@customElement("acquire-page")
export class AcquirePageElement extends LitElement {
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

  appService = new AcquireAppService();

  onLogout() {
    this.appService.clearPlayerId();
    window.location.href = location.origin;
  }

  render() {
    const playerId = this.appService.getPlayerId();

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
