import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("acquire-create-game")
export class AcquireCreateGameElement extends LitElement {
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    input {
      width: 350px;
      max-width: 100%;
      line-height: 1.5;
      padding: 15px 10px;
      border: 1px solid hsl(0, 0%, 10%);
      color: #afafaf;
      box-sizing: border-box;
      outline: none;
      background: hsl(0, 0%, 14%);
      transition: background-color 0.3s cubic-bezier(0.57, 0.21, 0.69, 1.25),
        transform 0.3s cubic-bezier(0.57, 0.21, 0.69, 1.25);
    }

    input:focus {
      background: hsl(0, 7%, 20%);
    }

    button {
      margin-top: 1rem;
      cursor: pointer;
      background: var(--colors-primary);
      border: 1px solid var(--colors-primary);
      color: var(--colors-gray-900);
      width: 350px;
      max-width: 100%;
      padding: 15px 10px;
      font-size: 1.25rem;
    }
  `;

  onCreateNewGame() {
    this.dispatchEvent(new CustomEvent<void>("create"));
  }

  render() {
    return html`
      <img src="logo_144x144.svg" />
      <h1>Acquire</h1>
      <button @click="${() => this.onCreateNewGame()}">Start a new game</button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-create-game": AcquireCreateGameElement;
  }
}
