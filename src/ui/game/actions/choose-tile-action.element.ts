import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ChooseTile } from "../../../model/available-action";
import { TileUtils } from "../../../utils/tile-utils";
import { createConfirmTilePlaceEvent } from "../../events/confirm-tile-place-event";
import { createCancelTilePlaceEvent } from "../../events/cancel-tile-place-event";

@customElement("acquire-choose-tile-action")
export class ChooseTileActionElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 1rem;
      color: var(--colors-gray-300);
    }

    button {
      width: 100%;
      background: transparent;
      border-radius: 0.5rem;
      padding: 0.875rem 1rem;
      cursor: pointer;
      border: 1px solid var(--colors-gray-300);
      color: var(--colors-gray-300);
    }

    button.confirm-btn {
      border: 1px solid var(--colors-primary);
      color: var(--colors-primary);
    }
  `;

  @property()
  action!: ChooseTile;

  @property()
  selectedTile!: number | null;

  render() {
    if (this.selectedTile !== null) {
      return html`
        <button
          class="confirm-btn"
          ?disabled="${this.selectedTile === null}"
          @click="${() => this.dispatchEvent(createConfirmTilePlaceEvent())}"
        >
          Place Tile ${TileUtils.getTileDisplay(this.selectedTile)}
        </button>

        <button
          class="cancen-btn"
          @click="${() => this.dispatchEvent(createCancelTilePlaceEvent())}"
        >
          Cancel
        </button>
      `;
    }

    return html`<p>Select a tile on the board highlighted in green</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-choose-tile-action": ChooseTileActionElement;
  }
}
