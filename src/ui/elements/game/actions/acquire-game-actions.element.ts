import { css, html, LitElement, PropertyValueMap, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ALL_HOTELS, HotelChainType, IGameState } from "../../../../model";
import { AvailableAction } from "../../../../model/available-action";
import { IAvailableActionState } from "../../../../model/available-action-state";
import { PlayerAction } from "../../../../model/player-action";
import { PlayerUtils } from "../../../../utils/player-utils";
import "./choose-tile-action.element";
import {
  createTileSelectEvent,
  TileSelectEvent,
} from "../../../events/tile-select-event";
import { createConfirmTilePlaceEvent } from "../../../events/confirm-tile-place-event";
import "./end-turn-action.element";
import "./choose-hotel-chain-action.element";
import { StartHotelChainEvent } from "../../../events/start-hotel-chain-event";
import "./choose-shares-action.element";
import { PurchaseShareEvent } from "../../../events/purchase-share-event";
import { createUndoActionEvent } from "../../../events/undo-action-event";
import { createCancelTilePlaceEvent } from "../../../events/cancel-tile-place-event";
import "./choose-merge-direction.element";
import { MergeEvent } from "../../../events/merge-event";
import "./choose-orphaned-shares.element";
import { TradeShareEvent } from "../../../events/trade-share-event";
import { KeepShareEvent } from "../../../events/keep-share-event";
import { SellShareEvent } from "../../../events/sell-share-event";
import { createLeaveGameEvent } from "../../../events/leave-game-event";
import { PlayerActionResult } from "../../../../model/player-action-result";
import "./previous-action-log.element";
import "../confetti.element";
import { AcquireGameService } from "../acquire-game.service";
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.1/cdn/components/button/button.js';
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.1/cdn/components/button-group/button-group.js';
import { SharesUtils } from "../../../../utils/shares-utils";
import { HotelManager } from "../../../../model/hotel-manager";
import { styleMap } from "lit/directives/style-map.js";

export interface ActionRequestEvent {
  action: PlayerAction;
}

@customElement("acquire-game-actions")
export class AcquireGameActionsElement extends LitElement {
  @property()
  gameState!: IGameState;

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

  @state()
  view: 'actions' | 'reference' = 'actions'

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
      let winnerMessage;
      if (this.winners.length > 1) {
        winnerMessage = `
          ${this.winners.map(PlayerUtils.getDisplayName).join(" and ")} tie for
          the win!
        `;
      } else {
        winnerMessage = `
          ${PlayerUtils.getDisplayName(this.winners[0])} wins!
        `;
      }

      const game = AcquireGameService.getInstance().game;
      if (!game?.hasGameObject("acquire-confetti")) {
        const confetti = document.createElement("acquire-confetti");
        confetti.setAttribute("message", winnerMessage);
        confetti.addEventListener("confirm", () => {
          confetti.remove();
        });
        AcquireGameService.getInstance().game?.appendGameObject(confetti);
      }

      return html`
        ${winnerMessage}
        <div>
          <button
            class="primary"
            @click="${() => this.dispatchEvent(createLeaveGameEvent())}"
          >
            Leave Game
          </button>
        </div>
      `;
    }

    if (this.playerId === this.currentPlayerId) {
      if (
        this.previousActions.length &&
        !this.confirmPreviousActions &&
        !this.selectedTile
      ) {
        return html`
        <div class="actions">
          <acquire-previous-action-log
            .actionResults="${this.previousActions}"
            @confirm="${() => (this.confirmPreviousActions = true)}"
          />
        </div>`;
      }

      return html`
      <div class="actions-container">
        <div class="actions-topbar">
          <div>${this.renderUndoAction()}</div>

          <sl-button-group label="Alignment">
            <sl-button .variant="${this.view == 'actions' ? 'success' : 'default'}" @click="${() => this.view = 'actions'}" size="small">Action</sl-button>
            <sl-button .variant="${this.view == 'reference' ? 'success' : 'default'}" @click="${() => this.view = 'reference'}" size="small">Reference</sl-button>
          </sl-button-group>


        </div>
        <div class="actions">
          ${this.view == 'actions' ? this.renderActions() : this.renderReference()}
        </div>
      </div>`;
    } else {
      return html`<div class="actions">
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

    return html`<sl-button
    size="small"
      @click="${() => this.dispatchEvent(createUndoActionEvent())}"
    >
      Undo
    </sl-button>`;
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

  private renderReference() {
    const hotelManager = new HotelManager(this.gameState.boardState)
    const headers = ALL_HOTELS.map(h => html`
      <th style="${styleMap({
      color: "white",
      background: `var(--colors-${h})`,
      opacity: hotelManager.getHotel(h).isActive() ? 1 : 0.3
    })}">${h[0]}</th>
    `)
    const rows: TemplateResult<1>[] = []
    const sizes = [2, 3, 4, 5, 10, 20, 30, 40]
    sizes.forEach((size, idx) => {
      const rowData = [html`<th style="background: var(--colors-tile); color: var(--colors-gray-900)">${size}</th>`]
      for (let h of ALL_HOTELS) {
        const hotel = hotelManager.getHotel(h)
        const hotelSize = hotel.getSize()
        const nextSize = size == 40 ? 100 : sizes[idx + 1]
        const matchesSize = hotelSize >= size && hotelSize < nextSize
        rowData.push(html`
        <td style="${styleMap({
          opacity: matchesSize ? 1 : 0.3,
          color: matchesSize ? "var(--colors-emerald-400)" : "white",
        })}">
          <span style="display: flex; align-items: center; justify-content: center;">
            <span style="font-size: 0.75rem;">$${SharesUtils.getSharesCost(h, size) / 100}</span>
            <span style="font-size: 0.75rem;">00</span>
          </span>
        </td>
        `)
      }
      rows.push(html`<tr>${rowData}</tr>`)
    })
    return html`
    <table class="references" style="width: 100%; font-size: 0.875rem; table-layout: fixed;">
      <thead>
        <tr>
          <th></th>
          ${headers}
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    `
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
          .sharesState="${this.gameState.sharesState}"
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

  static styles = css`
  :host {
    display: flex;
    flex-direction: column;
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

  .actions-container {
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
  }

  .actions-topbar {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
  }

  .actions {
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
  }

  .actions button {
    width: 100%;
  }

  .col-span-full {
    grid-column: 1 / -1;
  }
`;
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-actions": AcquireGameActionsElement;
  }
}
