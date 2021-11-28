import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./acquire-page.element";

@customElement("acquire-create-game")
export class AcquireCreateGameElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    button {
      margin-top: 1rem;
      cursor: pointer;
      background: var(--colors-primary);
      border: 1px solid var(--colors-primary);
      color: var(--colors-gray-900);
      width: 100%;
      padding: 15px 10px;
      font-size: 1.25rem;
    }
  `;

  onCreateNewGame() {
    this.dispatchEvent(new CustomEvent<void>("create"));
  }

  render() {
    return html`
      <acquire-page>
        <button @click="${() => this.onCreateNewGame()}">
          Start a new game
        </button>
      </acquire-page>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-create-game": AcquireCreateGameElement;
  }
}
