import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { HotelChainType } from "../../../../model";

@customElement("acquire-hotel-name")
export class AcquireHotelNameElement extends LitElement {
  hotelChainType!: HotelChainType;

  render() {
    return html`<span style="background: var(--colors-${this.hotelChainType})"
      >${this.hotelChainType}</span
    >`;
  }

  static styles = css`
    span {
      color: white;
      font-size: 0.875rem;
      padding: 0.1875rem 0.5rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-hotel-name": AcquireHotelNameElement;
  }
}
