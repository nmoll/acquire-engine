import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { HotelChainType } from "../../model";
import { AvailableAction } from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";
import { PlayerAction } from "../../model/player-action";
import { PlayerUtils } from "../../utils/player-utils";

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

    button {
      background-color: var(--colors-gray-500);
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      color: white;
      width: 100%;
    }

    button:disabled {
      background: var(--colors-gray-800) !important;
      color: var(--colors-gray-500);
      cursor: not-allowed;
    }

    .actions {
      display: grid;
      grid-template-columns: auto auto;
      gap: 0.5rem;
    }

    .actions button {
      width: 100%;
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

  onEndGame() {
    this.dispatchEvent(
      new CustomEvent<ActionRequestEvent>("action-request", {
        detail: {
          action: {
            type: "EndGame",
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

  onChooseMergeDirection(
    hotelChainToKeep: HotelChainType,
    hotelChainToDissolve: HotelChainType
  ) {
    this.dispatchEvent(
      new CustomEvent<ActionRequestEvent>("action-request", {
        detail: {
          action: {
            type: "Merge",
            playerId: this.playerId,
            hotelChainToKeep,
            hotelChainToDissolve,
          },
        },
      })
    );
  }

  onPurchaseShare(hotelChain: HotelChainType) {
    this.dispatchEvent(
      new CustomEvent<ActionRequestEvent>("action-request", {
        detail: {
          action: {
            type: "PurchaseShares",
            playerId: this.playerId,
            hotelChain,
          },
        },
      })
    );
  }

  onChooseToKeepOrphanedShare(hotelChain: HotelChainType) {
    this.dispatchEvent(
      new CustomEvent<ActionRequestEvent>("action-request", {
        detail: {
          action: {
            type: "KeepOrphanedShare",
            playerId: this.playerId,
            hotelChain,
          },
        },
      })
    );
  }

  onChooseToSellOrphanedShare(hotelChain: HotelChainType) {
    this.dispatchEvent(
      new CustomEvent<ActionRequestEvent>("action-request", {
        detail: {
          action: {
            type: "SellOrphanedShare",
            playerId: this.playerId,
            hotelChain,
          },
        },
      })
    );
  }

  onChooseToTradeOrphanedShare(
    hotelChain: HotelChainType,
    hotelChainToReceive: HotelChainType
  ) {
    this.dispatchEvent(
      new CustomEvent<ActionRequestEvent>("action-request", {
        detail: {
          action: {
            type: "TradeOrphanedShare",
            playerId: this.playerId,
            hotelChain,
            hotelChainToReceive,
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
        html`<button style="background-color: var(--colors-${hotelChain})"  @click="${() =>
          this.onStartHotelChain(hotelChain)}"">${hotelChain}</button>`
    );
  }

  renderChooseMergeDirection(hotelChains: HotelChainType[]) {
    return html`
      <div>
        Choose hotel chain to dissolve:
        <div>
          ${hotelChains.map(
            (hotelChain) =>
              html`<button
                style="color: var(--colors-${hotelChain})"
                @click="${() => {
                  const hotelChainToDisolve = hotelChain;
                  const hotelChainToKeep = hotelChains.find(
                    (h) => h !== hotelChainToDisolve
                  );
                  if (!hotelChainToKeep) {
                    throw new Error("Could not find hotel chain to keep");
                  }

                  this.onChooseMergeDirection(
                    hotelChainToKeep,
                    hotelChainToDisolve
                  );
                }}"
              >
                ${hotelChain}
              </button>`
          )}
        </div>
      </div>
    `;
  }

  renderChooseShares(shares: { hotelChain: HotelChainType; price: number }[]) {
    return shares.map(
      ({ hotelChain, price }) =>
        html`<button
          style="background-color: var(--colors-${hotelChain})"
          @click="${() => this.onPurchaseShare(hotelChain)}"
        >
          ${hotelChain}: $${price}
        </button>`
    );
  }

  renderChooseToSellOrphanedShare(
    hotelChain: HotelChainType,
    remainingShares: number
  ) {
    return html`<button
      @click="${() => this.onChooseToSellOrphanedShare(hotelChain)}"
    >
      Sell 1/${remainingShares} ${hotelChain}
    </button>`;
  }

  renderChooseToKeepOrphanedShare(
    hotelChain: HotelChainType,
    remainingShares: number
  ) {
    return html`<button
      @click="${() => this.onChooseToKeepOrphanedShare(hotelChain)}"
    >
      Keep 1/${remainingShares} ${hotelChain}
    </button>`;
  }

  renderChooseToTradeOrphanedShare(
    hotelChain: HotelChainType,
    hotelChainToReceive: HotelChainType,
    remainingShares: number
  ) {
    return html`<button
      @click="${() =>
        this.onChooseToTradeOrphanedShare(hotelChain, hotelChainToReceive)}"
    >
      Trade 2/${remainingShares} ${hotelChain} for 1 ${hotelChainToReceive}
    </button>`;
  }

  renderChooseEndTurn() {
    return html`<button @click="${() => this.onEndTurn()}">End Turn</button>`;
  }

  renderChooseEndGame() {
    return html`<button @click="${() => this.onEndGame()}">End Game</button>`;
  }

  renderAction(action: AvailableAction) {
    switch (action.type) {
      case "ChooseTile":
        return this.renderChooseTile();
      case "ChooseHotelChain":
        return this.renderChooseHotelChain(action.hotelChains);
      case "ChooseMergeDirection":
        return this.renderChooseMergeDirection(action.options);
      case "ChooseShares":
        return this.renderChooseShares(action.shares);
      case "ChooseToKeepOrphanedShare":
        return this.renderChooseToKeepOrphanedShare(
          action.hotelChain,
          action.remainingShares
        );
      case "ChooseToSellOrphanedShare":
        return this.renderChooseToSellOrphanedShare(
          action.hotelChain,
          action.remainingShares
        );
      case "ChooseToTradeOrphanedShare":
        return this.renderChooseToTradeOrphanedShare(
          action.hotelChain,
          action.hotelChainToReceive,
          action.remainingShares
        );
      case "ChooseEndTurn":
        return this.renderChooseEndTurn();
      case "ChooseEndGame":
        return this.renderChooseEndGame();
    }
  }

  render() {
    if (this.playerId === this.currentPlayerId) {
      return html`<div class="actions">
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
