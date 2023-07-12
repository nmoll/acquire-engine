import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("acquire-undo-icon")
export class UndoIconElement extends LitElement {
  static styles = css`
    :host {
      color: white;
      width: 1rem;
      height: 1rem;
    }
  `;

  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16px"
        viewBox="0 -960 960 960"
        width="16px"
      >
        <path
          d="M280-200v-60h289q70 0 120.5-46.5T740-422q0-69-50.5-115.5T569-584H274l114 114-42 42-186-186 186-186 42 42-114 114h294q95 0 163.5 64T800-422q0 94-68.5 158T568-200H280Z"
          fill="var(--colors-gray-300)"
        />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-undo-icon": UndoIconElement;
  }
}
