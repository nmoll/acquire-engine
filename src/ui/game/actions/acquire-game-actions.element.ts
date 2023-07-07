import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { HotelChainType } from "../../../model";
import { AvailableAction } from "../../../model/available-action";
import { IAvailableActionState } from "../../../model/available-action-state";
import { PlayerAction } from "../../../model/player-action";
import { PlayerUtils } from "../../../utils/player-utils";
import "./choose-tile-action.element";
import {
  createTileSelectEvent,
  TileSelectEvent,
} from "../../events/tile-select-event";
import { createConfirmTilePlaceEvent } from "../../events/confirm-tile-place-event";
import "./end-turn-action.element";
import "./choose-hotel-chain-action.element";
import { StartHotelChainEvent } from "../../events/start-hotel-chain-event";
import "./choose-shares-action.element";
import { PurchaseShareEvent } from "../../events/purchase-share-event";

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
      gap: 1rem;
    }

    .actions button {
      width: 100%;
    }

    .col-span-full {
      grid-column: 1 / -1;
    }
  `;

  @property()
  playerId!: string;

  @property()
  currentPlayerId!: string;

  @property()
  availableActionState: IAvailableActionState | undefined;

  @property()
  selectedTile!: number | null;

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

  renderChooseEndGame() {
    return html`<button
      @click="${() => this.onEndGame()}"
      class="col-span-full"
    >
      End Game
    </button>`;
  }

  renderAction(action: AvailableAction) {
    switch (action.type) {
      case "ChooseTile":
        return html`<acquire-choose-tile-action
          .action="${action}"
          .selectedTile="${this.selectedTile}"
          @tile-select="${(e: TileSelectEvent) =>
            this.dispatchEvent(createTileSelectEvent(e.tile))}"
          @confirm-tile-place="${() =>
            this.dispatchEvent(createConfirmTilePlaceEvent())}"
        />`;
      case "ChooseHotelChain":
        return html`<acquire-choose-hotel-chain-action
          .action="${action}"
          @start-hotel-chain="${(e: StartHotelChainEvent) =>
            this.onStartHotelChain(e.hotelChain)}"
        />`;
      case "ChooseMergeDirection":
        return this.renderChooseMergeDirection(action.options);
      case "ChooseShares":
        return html`<acquire-choose-shares-action
          .action="${action}"
          @purchase-share="${(e: PurchaseShareEvent) =>
            this.onPurchaseShare(e.hotelChain)}"
          class="col-span-full"
        />`;
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
        return html`<acquire-end-turn-action
          @end-turn="${() => this.onEndTurn()}"
          class="col-span-full"
        />`;
      case "ChooseEndGame":
        return this.renderChooseEndGame();
    }
  }

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
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-actions": AcquireGameActionsElement;
  }
}
