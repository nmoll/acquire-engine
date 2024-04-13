import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { HotelChainType } from "../../../model";

@customElement("acquire-player-shares")
export class PlayerSharesElement extends LitElement {
  static styles = css`
    .container {
      width: 1.25rem;
      height: 1.25rem;
      position: relative;
      overflow: hidden;
    }

    .slider {
      position: absolute;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 350ms;
    }

    .shares {
      color: white;
      width: 1.25rem;
      height: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fade {
      opacity: 0.25;
    }
  `;

  @property()
  numShares: number = 0;

  @property()
  hotelChain!: HotelChainType;

  private shareNumbers = Array.from(new Array(26)).map((_, idx) => idx);

  render() {
    const sliderTop = -1.25 * this.numShares;
    return html`
      <div class="container">
        <div class="slider" style="top: ${sliderTop}rem">
          ${this.shareNumbers.map(
      (num) => html`
              <span
                class="shares ${num === 0 ? "fade" : ""}"
                data-qa="${num === this.numShares ? 'visible' : 'hidden'}"
                style="background: var(--colors-${this.hotelChain})"
                >${num}</span
              >
            `
    )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-player-shares": PlayerSharesElement;
  }
}
