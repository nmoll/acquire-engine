import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ChooseShares } from "../../../model/available-action";
import { ALL_HOTELS, HotelChainType, ISharesState } from "../../../model";
import { createPurchaseShareEvent } from "../../events/purchase-share-event";
import { StockBroker } from "../../../model/stock-broker";

@customElement("acquire-choose-shares-action")
export class ChooseSharesActionElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
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
  `;

  @property()
  action!: ChooseShares;

  @property()
  sharesState!: ISharesState;

  render() {
    return html`
      <div class="options">
        ${ALL_HOTELS.map((hotelChain) => this.renderOption(hotelChain))}
      </div>
    `;
  }

  renderOption(hotelChain: HotelChainType) {
    const share = this.action.shares.find((s) => s.hotelChain === hotelChain);
    if (share) {
      return html`<button
        style="background-color: var(--colors-${hotelChain})"
        @click="${() =>
          this.dispatchEvent(createPurchaseShareEvent(hotelChain))}"
      >
        (${this.getAvailableShares(hotelChain)}) ${hotelChain}: $${share.price}
      </button>`;
    } else {
      return html`<button disabled>${hotelChain}</button>`;
    }
  }

  private getAvailableShares(hotelChain: HotelChainType) {
    const stockBroker = new StockBroker(this.sharesState);
    return stockBroker.getAvailableShares(hotelChain);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-choose-shares-action": ChooseSharesActionElement;
  }
}
