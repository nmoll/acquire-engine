import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

export interface SaveUsernameEvent {
  username: string;
}

@customElement("acquire-create-username")
export class AcquireCreateUsernameElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

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
      <div>
        <p>Hey, looks like you are new here. What should we call you?</p>
        <input id="name" autocomplete="off" placeholder="Enter your name" />
        <acquire-button @click="${() => this.onSubmit()}">GO</acquire-button>
      </div>
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
