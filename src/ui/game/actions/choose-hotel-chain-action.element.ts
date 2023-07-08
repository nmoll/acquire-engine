import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ChooseHotelChain } from "../../../model/available-action";
import { createStartHotelChainEvent } from "../../events/start-hotel-chain-event";
import { HotelChainType } from "../../../model";
import { GameConfig } from "../../../game-config";

@customElement("acquire-choose-hotel-chain-action")
export class ChooseHotelChainActionElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .option-grid {
      display: grid;
      grid-template-columns: min-content 1fr 1fr 1fr;
      align-items: center;
      column-gap: 0.5rem;
      row-gap: 0.875rem;
    }

    .price {
      color: var(--colors-primary);
    }

    button {
      border: 1px solid var(--colors-gray-300);
      color: var(--colors-gray-300);
      background: transparent;
      border-radius: 0.5rem;
      padding: 0.875rem 1rem;
      cursor: pointer;
      width: 100%;
    }

    .option-grid button {
      padding: 0.5rem 1rem;
      border: 0;
    }

    .confirm-btn {
      border: 1px solid var(--colors-primary);
      color: var(--colors-primary);
    }
  `;

  @property()
  action!: ChooseHotelChain;

  @state()
  selected: HotelChainType | null = null;

  render() {
    if (this.selected) {
      return html`
        <button class="confirm-btn" @click="${() => this.onConfirm()}">
          Start ${this.selected ?? "Hotel Chain"}
        </button>
        <button @click="${() => (this.selected = null)}">Cancel</button>
      `;
    }

    return html`
      <span>Choose a hotel chain to start:</span>
      <div class="option-grid">${this.renderHotelOptions()}</div>
    `;
  }

  renderHotelOptions() {
    const options = this.action.hotelChains;
    const tier1 = options.filter((o) => GameConfig.hotel.basePrice[o] === 200);
    const tier2 = options.filter((o) => GameConfig.hotel.basePrice[o] === 300);
    const tier3 = options.filter((o) => GameConfig.hotel.basePrice[o] === 400);

    return html`
      ${this.renderTier(tier1, 200)} ${this.renderTier(tier2, 300)}
      ${this.renderTier(tier3, 400)}
    `;
  }

  renderTier(hotelChains: HotelChainType[], price: number) {
    if (hotelChains.length) {
      return html`<div class="price">$${price}</div>
        <div>
          ${hotelChains[0] ? this.renderHotelOption(hotelChains[0]) : ""}
        </div>
        <div>
          ${hotelChains[1] ? this.renderHotelOption(hotelChains[1]) : ""}
        </div>
        <div>
          ${hotelChains[2] ? this.renderHotelOption(hotelChains[2]) : ""}
        </div>`;
    }
    return "";
  }

  private renderHotelOption(hotelChain: HotelChainType) {
    return html`<button
      style="background-color: var(--colors-${hotelChain})"
      @click="${() => (this.selected = hotelChain)}"
    >
      ${hotelChain}
    </button>`;
  }

  private onConfirm() {
    if (!this.selected) {
      return;
    }

    this.dispatchEvent(createStartHotelChainEvent(this.selected));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-choose-hotel-chain-action": ChooseHotelChainActionElement;
  }
}
