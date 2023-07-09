import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("acquire-player-cash")
export class PlayerCashElement extends LitElement {
  static styles = css`
    :host {
      color: #34d399;
    }
  `;

  @property()
  cash: number = 0;

  @state()
  displayedCash = 0;

  @state()
  updating: "up" | "down" | null = null;

  protected update(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (changedProperties.has("cash")) {
      this.updateDisplayedCash();
    }

    super.update(changedProperties);
  }

  render() {
    let color;
    if (this.updating === "up") {
      color = "#dcfce7";
    } else if (this.updating === "down") {
      color = "var(--colors-red-400)";
    } else {
      color = "var(--colors-emerald-400)";
    }
    return html` <span style="color: ${color}">$${this.displayedCash}</span> `;
  }

  private animateTimeout: NodeJS.Timeout | 0 = 0;

  private updateDisplayedCash() {
    const diff = Math.abs(this.displayedCash - this.cash);
    if (diff <= 21) {
      this.displayedCash = this.cash;
    }
    if (this.displayedCash === this.cash) {
      clearTimeout(this.animateTimeout);
      this.updating = null;
      return;
    }

    let amountToUpdate = 1000;
    if (diff > 2000) {
      amountToUpdate = 200;
    } else if (diff > 1000) {
      amountToUpdate = 1000;
    } else if (diff > 500) {
      amountToUpdate = 100;
    } else {
      amountToUpdate = 20;
    }

    if (this.displayedCash < this.cash) {
      this.displayedCash += amountToUpdate;
      this.updating = "up";
    } else {
      this.displayedCash -= amountToUpdate;
      this.updating = "down";
    }

    this.animateTimeout = setTimeout(() => {
      this.updateDisplayedCash();
    }, 50);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-player-cash": PlayerCashElement;
  }
}
