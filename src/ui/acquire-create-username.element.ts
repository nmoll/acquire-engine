import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./acquire-page.element";

export interface SaveUsernameEvent {
  username: string;
}

@customElement("acquire-create-username")
export class AcquireCreateUsernameElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    input {
      width: 100%;
      line-height: 1.5;
      padding: 15px 10px;
      border: 1px solid hsl(0, 0%, 10%);
      color: #afafaf;
      box-sizing: border-box;
      outline: none;
      background: hsl(0, 0%, 14%);
      transition: background-color 0.3s cubic-bezier(0.57, 0.21, 0.69, 1.25),
        transform 0.3s cubic-bezier(0.57, 0.21, 0.69, 1.25);
      font-size: 1.25rem;
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
      width: 100%;
      padding: 15px 10px;
      font-size: 1.25rem;
    }
  `;

  firstUpdated() {
    const nameInput = this.shadowRoot?.getElementById("name");
    nameInput?.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSubmit();
      }
    });
  }

  onSubmit() {
    const username = this.getInputEl().value;
    if (username.length <= 0) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent<SaveUsernameEvent>("save", {
        detail: {
          username,
        },
      })
    );
  }

  render() {
    return html`
      <acquire-page>
        <input
          id="name"
          autocomplete="off"
          autofocus="true"
          placeholder="Enter your display name..."
        />
        <button @click="${() => this.onSubmit()}">DONE</button>
      </acquire-page>
    `;
  }

  private getInputEl(): HTMLInputElement {
    return this.shadowRoot!.getElementById("name")! as HTMLInputElement;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-create-username": AcquireCreateUsernameElement;
  }
}
