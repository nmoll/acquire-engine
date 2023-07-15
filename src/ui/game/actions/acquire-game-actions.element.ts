import { css, html, LitElement, PropertyValueMap } from "lit";
import "../../icon/undo-icon.element";
import { customElement, property, state } from "lit/decorators.js";
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
import { createUndoActionEvent } from "../../events/undo-action-event";
import { createCancelTilePlaceEvent } from "../../events/cancel-tile-place-event";
import "./choose-merge-direction.element";
import { MergeEvent } from "../../events/merge-event";
import "./choose-orphaned-shares.element";
import { TradeShareEvent } from "../../events/trade-share-event";
import { KeepShareEvent } from "../../events/keep-share-event";
import { SellShareEvent } from "../../events/sell-share-event";
import { createLeaveGameEvent } from "../../events/leave-game-event";
import { PlayerActionResult } from "../../../model/player-action-result";
import "./previous-action-log.element";
import "../confetti.element";
import { AcquireGameService } from "../acquire-game.service";

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
      position: relative;
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

    button.primary {
      background-color: transparent;
      border: 1px solid var(--colors-primary);
      color: var(--colors-primary);
    }

    button.end-game {
      background-color: transparent;
      border: 1px solid var(--colors-yellow-300);
      color: var(--colors-yellow-300);
      padding: 1rem 1rem;
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

    button.undo {
      position: absolute;
      top: 0.25rem;
      left: 0.25rem;
      width: 2.25rem;
      height: 2.25rem;
      padding: 0.25rem;
      padding-left: 0;
      background: var(--colors-gray-800);
      color: var(--colors-gray-300);
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
  winners: string[] | null = null;

  @property()
  availableActionState: IAvailableActionState | undefined;

  @property()
  selectedTile!: number | null;

  @property()
  previousActions: PlayerActionResult[] = [];

  @state()
  confirmPreviousActions = false;

  constructor() {
    super();

    AcquireGameService.getInstance().setGameActions(this);
  }

  protected update(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (changedProperties.has("previousActions")) {
      if (!this.previousActions.length) {
        // reset confirm so next turn will show it again
        this.confirmPreviousActions = false;
      }
    }

    super.update(changedProperties);
  }

  render() {
    if (this.winners) {
      const game = AcquireGameService.getInstance().game;
      if (!game?.hasGameObject("acquire-confetti")) {
        AcquireGameService.getInstance().game?.appendGameObject(
          document.createElement("acquire-confetti")
        );
      }

      if (this.winners.length > 1) {
        return html`
          ${this.winners.map(PlayerUtils.getDisplayName).join(" and ")} tie for
          the win!
        `;
      } else {
        return html`
          ${PlayerUtils.getDisplayName(this.winners[0])} wins!
          <div>
            <button
              class="primary"
              @click="${() => this.dispatchEvent(createLeaveGameEvent())}"
              style="position: absolute; left: 0;"
            >
              Leave Game
            </button>
          </div>
        `;
      }
    }

    if (this.playerId === this.currentPlayerId) {
      if (
        this.previousActions.length &&
        !this.confirmPreviousActions &&
        !this.selectedTile
      ) {
        return html` <acquire-previous-action-log
          .actionResults="${this.previousActions}"
          @confirm="${() => (this.confirmPreviousActions = true)}"
        />`;
      }

      return html`<div class="actions">
        ${this.renderUndoAction()} ${this.renderActions()}
      </div>`;
    } else {
      return html`<div>
        Waiting for ${PlayerUtils.getDisplayName(this.currentPlayerId)} to move
      </div>`;
    }
  }

  private renderUndoAction() {
    const isPlaceTileAction = this.availableActionState?.some(
      (action) => action.type === "ChooseTile"
    );
    if (isPlaceTileAction) {
      return;
    }

    return html`<button
      class="undo"
      @click="${() => this.dispatchEvent(createUndoActionEvent())}"
    >
      <acquire-undo-icon />
    </button>`;
  }

  private renderActions() {
    if (!this.availableActionState) {
      return;
    }

    if (
      this.availableActionState.some(
        (action) =>
          action.type === "ChooseToKeepOrphanedShare" ||
          action.type === "ChooseToSellOrphanedShare" ||
          action.type === "ChooseToTradeOrphanedShare"
      )
    ) {
      return html`<acquire-choose-orphaned-shares-action
        .actions="${this.availableActionState}"
        @trade-share="${(e: TradeShareEvent) =>
          this.onChooseToTradeOrphanedShare(
            e.hotelChain,
            e.hotelChainToReceive
          )}"
        @keep-share="${(e: KeepShareEvent) =>
          this.onChooseToKeepOrphanedShare(e.hotelChain)}"
        @sell-share="${(e: SellShareEvent) =>
          this.onChooseToSellOrphanedShare(e.hotelChain)}"
      />`;
    }

    return this.availableActionState.map((action) => this.renderAction(action));
  }

  renderChooseEndGame() {
    return html`<button
      @click="${() => this.onEndGame()}"
      class="col-span-full end-game"
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
          @cancel-tile-place="${() =>
            this.dispatchEvent(createCancelTilePlaceEvent())}"
        />`;
      case "ChooseHotelChain":
        return html`<acquire-choose-hotel-chain-action
          .action="${action}"
          @start-hotel-chain="${(e: StartHotelChainEvent) =>
            this.onStartHotelChain(e.hotelChain)}"
        />`;
      case "ChooseMergeDirection":
        return html`<acquire-choose-merge-direction-action
          .action="${action}"
          @merge="${(e: MergeEvent) =>
            this.onChooseMergeDirection(e.survivor, e.dissolve)}"
        />`;
      case "ChooseShares":
        return html`<acquire-choose-shares-action
          .action="${action}"
          @purchase-share="${(e: PurchaseShareEvent) =>
            this.onPurchaseShare(e.hotelChain)}"
          class="col-span-full"
        />`;
      case "ChooseEndTurn":
        return html`<acquire-end-turn-action
          @end-turn="${() => this.onEndTurn()}"
          class="col-span-full"
        />`;
      case "ChooseEndGame":
        return this.renderChooseEndGame();
      default:
        return;
    }
  }

  private onEndTurn() {
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

  private onEndGame() {
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

  private onStartHotelChain(hotelChain: HotelChainType) {
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

  private onChooseMergeDirection(
    survivor: HotelChainType,
    dissolve: HotelChainType[]
  ) {
    this.dispatchEvent(
      new CustomEvent<ActionRequestEvent>("action-request", {
        detail: {
          action: {
            type: "Merge",
            playerId: this.playerId,
            survivor,
            dissolve,
          },
        },
      })
    );
  }

  private onPurchaseShare(hotelChain: HotelChainType) {
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

  private onChooseToKeepOrphanedShare(hotelChain: HotelChainType) {
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

  private onChooseToSellOrphanedShare(hotelChain: HotelChainType) {
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

  private onChooseToTradeOrphanedShare(
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
