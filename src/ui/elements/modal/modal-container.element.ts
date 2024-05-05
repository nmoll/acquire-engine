import { consume } from "@lit/context";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { modalServiceContext } from "../../context/modal.service.context";
import { ModalService } from "./modal.service";
import { SignalWatcher } from "@lit-labs/preact-signals";

@customElement("acquire-modal-container")
export class AcquireModalContainerElement extends SignalWatcher(LitElement) {
  @consume({ context: modalServiceContext })
  modalService!: ModalService;

  render() {
    const modalConfig = this.modalService.modalRequest.value;
    if (!modalConfig) {
      return;
    }

    return html`
      <div class="modal-container">
        <div class="modal">
          <h2>${modalConfig.title}</h2>
          <div class="body">${modalConfig.template}</div>
          <div class="footer">
            <button
              class="primary"
              @click="${() => this.modalService.onClose()}"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .modal-container {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background-color: #00000091;
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
    }

    .modal {
      background: var(--colors-gray-900);
      border: 1px solid var(--colors-gray-800);
      border-radius: 0.5rem;
      padding: 1rem;
      box-shadow:
        0 20px 25px -5px rgb(0 0 0 / 0.1),
        0 8px 10px -6px rgb(0 0 0 / 0.1);
      max-width: 100%;
    }

    .body {
      padding: 1rem 0;
      border-top: 1px solid var(--colors-gray-800);
      border-bottom: 1px solid black;
    }

    .footer {
      padding-top: 1rem;
      border-top: 1px solid var(--colors-gray-800);
    }

    button {
      background-color: var(--colors-gray-500);
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      color: white;
      width: 100%;
    }

    button.primary {
      background-color: transparent;
      border: 1px solid var(--colors-primary);
      color: var(--colors-primary);
    }

    h2 {
      margin: 0;
      color: var(--colors-primary);
      font-weight: normal;
      border-bottom: 1px solid black;
      padding-bottom: 0.5rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-modal-container": AcquireModalContainerElement;
  }
}
