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
    }
  `;

  @property()
  color!: string;

  getStyles() {
    return {
      backgroundColor: this.color ?? "",
      borderColor: this.color ?? "",
    };
  }

  render() {
    const styles = this.getStyles();
    return html`<button style="${styleMap(styles)}">
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-button": AcquireButton;
  }
}
