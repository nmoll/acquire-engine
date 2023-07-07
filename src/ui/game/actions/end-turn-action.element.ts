import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createEndTurnEvent } from "../../events/end-turn-event";

@customElement("acquire-end-turn-action")
export class ChooseEndTurnActionElement extends LitElement {
  static styles = css`
    button {
      width: 100%;
      border: 1px solid var(--colors-primary);
      background: transparent;
      border-radius: 0.5rem;
      padding: 0.875rem 1rem;
      cursor: pointer;
      color: var(--colors-primary);
      width: 100%;
    }
  `;

  render() {
    return html`
      <button
        class="confirm-btn"
        @click="${() => this.dispatchEvent(createEndTurnEvent())}"
      >
        End Turn
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-end-turn-action": ChooseEndTurnActionElement;
  }
}
