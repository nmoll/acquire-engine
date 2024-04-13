import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IAvailableActionState } from "../../../../model/available-action-state";
import {
  ChooseToKeepOrphanedShare,
  ChooseToSellOrphanedShare,
  ChooseToTradeOrphanedShare,
} from "../../../../model/available-action";
import { createKeepShareEvent } from "../../../events/keep-share-event";
import { createSellShareEvent } from "../../../events/sell-share-event";
import { createTradeShareEvent } from "../../../events/trade-share-event";

@customElement("acquire-choose-orphaned-shares-action")
export class ChooseOrphanedSharesActionElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      color: var(--colors-gray-300);
      padding: 1rem;
      position: relative;
    }

    button {
      border: 1px solid var(--colors-gray-300);
      background: transparent;
      border-radius: 0.5rem;
      padding: 0.875rem 1rem;
      cursor: pointer;
      color: white;
      width: 100%;
    }

    button:disabled {
      background: var(--colors-gray-800) !important;
      color: var(--colors-gray-500);
      cursor: not-allowed;
    }

    .shares {
      color: white;
      width: 1.25rem;
      height: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .shares-container {
      display: flex;
      gap: 0.5rem;
    }
  `;

  @property()
  actions!: IAvailableActionState;

  render() {
    const dissolved = this.getKeepAction().hotelChain;
    const remainingShares = this.getKeepAction().remainingShares;

    return html`
      <div>
        <span style="color: var(--colors-${dissolved})">${dissolved}</span> has
        been dissolved. What would you like to do with your shares?
      </div>
      <div class="shares-container">
        <span class="shares" style="background: var(--colors-${dissolved})"
          >${remainingShares}</span
        >
        left
      </div>
      ${this.renderKeep()} ${this.renderSell()} ${this.renderTrade()}
    `;
  }

  private renderKeep() {
    const keepAction = this.getKeepAction();
    return html`<button
      style="border: 1px solid var(--colors-${keepAction.hotelChain}); color: var(--colors-${keepAction.hotelChain})"
      @click="${() =>
        this.dispatchEvent(createKeepShareEvent(keepAction.hotelChain))}"
    >
      Keep 1
    </button>`;
  }

  private renderSell() {
    const sellAction = this.actions.find(
      (action): action is ChooseToSellOrphanedShare =>
        action.type === "ChooseToSellOrphanedShare"
    );
    if (sellAction) {
      return html`<button
        style="border: 1px solid var(--colors-${sellAction.hotelChain}); color: var(--colors-${sellAction.hotelChain})"
        @click="${() =>
          this.dispatchEvent(createSellShareEvent(sellAction.hotelChain))}"
      >
        Sell 1
      </button>`;
    } else {
      return html`<button disabled>Sell 1</button>`;
    }
  }

  private renderTrade() {
    const tradeAction = this.actions.find(
      (action): action is ChooseToTradeOrphanedShare =>
        action.type === "ChooseToTradeOrphanedShare"
    );
    if (tradeAction) {
      return html`<button
        style="border: 1px solid var(--colors-${tradeAction.hotelChainToReceive}); color: var(--colors-${tradeAction.hotelChainToReceive})"
        @click="${() =>
          this.dispatchEvent(
            createTradeShareEvent(
              tradeAction.hotelChain,
              tradeAction.hotelChainToReceive
            )
          )}"
      >
        Trade 2 for 1 ${tradeAction.hotelChainToReceive}
      </button>`;
    } else {
      return html`<button disabled>Trade</button>`;
    }
  }

  private getKeepAction(): ChooseToKeepOrphanedShare {
    const keepAction = this.actions.find(
      (action): action is ChooseToKeepOrphanedShare =>
        action.type === "ChooseToKeepOrphanedShare"
    );
    if (!keepAction) {
      throw new Error("No keep action found!");
    }

    return keepAction;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-choose-orphaned-shares-action": ChooseOrphanedSharesActionElement;
  }
}
