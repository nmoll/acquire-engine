import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

@customElement("acquire-button")
export class AcquireButton extends LitElement {
  static styles = css`
    button {
      border 1px solid;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      color: white;
    }
  `;

  @property()
  color!: string;

  @property()
  disabled!: boolean;

  getStyles() {
    return {
      backgroundColor: this.color ?? "var(--colors-gray-500)",
      borderColor: this.color ?? "var(--colors-gray-500)",
    };
  }

  render() {
    const styles = this.getStyles();
    return html`<button
      ?disabled="${this.disabled}"
      style="${styleMap(styles)}"
    >
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-button": AcquireButton;
  }
}
