import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { HotelChainType } from "../model";
import { AvailableAction } from "../model/available-action";
import { IAvailableActionState } from "../model/available-action-state";
import { AvailableShares } from "../model/available-shares.type";
import { PlayerAction } from "../model/player-action";
import { PlayerUtils } from "../utils/player-utils";

export interface ActionRequestEvent {
  action: PlayerAction;
}

@customElement("acquire-game-actions")
export class AcquireGameActionsElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
    }
  `;

  @property()
  playerId!: string;

  @property()
  currentPlayerId!: string;

  @property()
  availableActionState: IAvailableActionState | undefined;

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

  onPurchaseShare(hotel: HotelChainType, quantity: number) {
    this.dispatchEvent(
      new CustomEvent<ActionRequestEvent>("action-request", {
        detail: {
          action: {
            type: "PurchaseShares",
            playerId: this.playerId,
            shares: [
              {
                hotel,
                quantity,
              },
            ],
          },
        },
      })
    );
  }

  renderChooseTile() {
    return html`<span>Choose a tile</span>`;
  }

  renderChooseHotelChain(hotelChains: HotelChainType[]) {
    return hotelChains.map(
      (hotelChain) =>
        html`<acquire-button .color="${`var(--colors-${hotelChain})`}"  @click="${() =>
          this.onStartHotelChain(hotelChain)}"">${hotelChain}</acquire-button>`
    );
  }

  renderChooseMergeDirection() {
    return html`<span>Choose merge direction (not implemented)</span>`;
  }

  renderChooseShares(availableShares: AvailableShares) {
    const hotelChains = Object.keys(availableShares) as HotelChainType[];
    return hotelChains.map(
      (hotelChain) =>
        html`<acquire-button
          .color="${`var(--colors-${hotelChain})`}"
          ?disabled="${!availableShares[hotelChain]}"
          @click="${() =>
            this.onPurchaseShare(hotelChain, availableShares[hotelChain] ?? 0)}"
        >
          Purchase ${availableShares[hotelChain] ?? 0} ${hotelChain}
        </acquire-button>`
    );
  }

  renderChooseEndTurn() {
    return html`<acquire-button @click="${() => this.onEndTurn()}"
      >End Turn</acquire-button
    >`;
  }

  renderAction(action: AvailableAction) {
    switch (action.type) {
      case "ChooseTile":
        return this.renderChooseTile();
      case "ChooseHotelChain":
        return this.renderChooseHotelChain(action.hotelChains);
      case "ChooseMergeDirection":
        return this.renderChooseMergeDirection();
      case "ChooseShares":
        return this.renderChooseShares(action.availableShares);
      case "ChooseEndTurn":
        return this.renderChooseEndTurn();
    }
  }

  render() {
    if (this.playerId === this.currentPlayerId) {
      return html`<div>
        ${this.availableActionState?.map((action) => this.renderAction(action))}
      </div>`;
    } else {
      return html`<div>
        Waiting for ${PlayerUtils.getDisplayName(this.currentPlayerId)} to move
      </div>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-actions": AcquireGameActionsElement;
  }
}
