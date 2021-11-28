import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("acquire-page")
export class AcquirePageElement extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      max-width: 450px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem 1rem;
      box-sizing: border-box;
    }
  `;

  @property()
  title!: string;

  render() {
    return html`
      <img src="logo_144x144.svg" />
      <h1>${this.title || "Acquire"}</h1>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-page": AcquirePageElement;
  }
}
