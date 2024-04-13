import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ChooseMergeDirection } from "../../../../model/available-action";
import { HotelChainType } from "../../../../model";
import { createMergeEvent } from "../../../events/merge-event";

@customElement("acquire-choose-merge-direction-action")
export class ChooseMergeDirectionActionElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    button {
      color: white;
      background: transparent;
      border-radius: 0.5rem;
      padding: 0.875rem 1rem;
      cursor: pointer;
      border: 0;
      width: 100%;
    }

    .confirm-btn {
      border: 1px solid var(--colors-primary);
      color: var(--colors-primary);
    }

    .cancel-btn {
      border: 1px solid var(--colors-gray-300);
      color: var(--colors-gray-300);
    }
  `;

  @property()
  action!: ChooseMergeDirection;

  @state()
  selected: HotelChainType | null = null;

  render() {
    if (this.selected) {
      const hotelChainsToDissolve = this.action.options.filter(
        (h) => h !== this.selected
      );
      return html`
        <p>
          Merge
          ${hotelChainsToDissolve.map((h) => this.renderHotelChainName(h))} into
          ${this.renderHotelChainName(this.selected)}?
        </p>
        <button class="confirm-btn" @click="${() => this.onConfirm()}">
          Confirm
        </button>
        <button class="cancel-btn" @click="${() => (this.selected = null)}">
          Cancel
        </button>
      `;
    }

    return html`
      <span>Choose surviving hotel chain:</span>

      ${this.action.options.map(
      (hotelChain) =>
        html`<button
            style="background-color: var(--colors-${hotelChain})"
            @click="${() => (this.selected = hotelChain)}"
          >
            ${hotelChain}
          </button>`
    )}
    `;
  }

  private renderHotelChainName(hotelChain: HotelChainType) {
    return html`<span style="color: var(--colors-${hotelChain})"
      >${hotelChain}</span
    >`;
  }

  private onConfirm() {
    if (!this.selected) {
      return;
    }

    const survivor = this.selected;
    const dissolve = this.action.options.filter((h) => h !== survivor);

    this.dispatchEvent(
      createMergeEvent({
        survivor,
        dissolve,
      })
    );
  }

  //   private onConfirm() {
  //     if (!this.selected) {
  //       return;
  //     }

  //     this.dispatchEvent(createStartHotelChainEvent(this.selected));
  //   }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-choose-merge-direction-action": ChooseMergeDirectionActionElement;
  }
}
