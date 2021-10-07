import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ALL_HOTELS, HotelChainType } from "../model";
import { PlayerAction } from "../model/player-action";

export interface ActionRequestEvent {
  action: PlayerAction;
}

@customElement("acquire-actions")
export class AcquireActionsElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      padding: 1rem;
    }
  `;

  @property()
  playerId!: number;

  onEndTurn() {
    this.dispatchEvent(
      new CustomEvent<ActionRequestEvent>("action-request", {
        detail: {
          action: {
            type: "EndTurn",
            playerId: this.playerId,
          },
        },
      })
    );
  }

  onStartHotelChain(hotelChain: HotelChainType) {
    this.dispatchEvent(
      new CustomEvent<ActionRequestEvent>("action-request", {
        detail: {
          action: {
            type: "StartHotelChain",
            playerId: this.playerId,
            hotelChain,
          },
        },
      })
    );
  }

  render() {
    return html`
      ${ALL_HOTELS.map(
        (type) => html`
          <button @click="${() => this.onStartHotelChain(type)}">
            ${type}
          </button>
        `
      )}
      <button @click="${() => this.onEndTurn()}">End Turn</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-actions": AcquireActionsElement;
  }
}
