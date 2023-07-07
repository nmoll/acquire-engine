import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ChooseTile } from "../../../model/available-action";
import { PlayerAction } from "../../../model/player-action";
import { TileUtils } from "../../../utils/tile-utils";
import { createTileSelectEvent } from "../../events/tile-select-event";
import { createConfirmTilePlaceEvent } from "../../events/confirm-tile-place-event";

export interface ActionRequestEvent {
  action: PlayerAction;
}

@customElement("acquire-choose-tile-action")
export class AcquireGameActionsElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      color: var(--colors-gray-300);
    }

    p {
      margin: 0;
    }

    .tile-rack {
      display: flex;
      gap: 1.5rem;
    }

    .tile {
      border: 1px solid var(--colors-primary);
      color: var(--colors-primary);
      background: transparent;
      width: 2.75rem;
      height: 2.75rem;
      cursor: pointer;
    }

    .tile.selected {
      background: var(--colors-tile);
      color: var(--colors-gray-700);
    }

    .confirm-btn {
      width: 100%;
      border: 1px solid var(--colors-primary);
      background: transparent;
      border-radius: 0.5rem;
      padding: 0.875rem 1rem;
      cursor: pointer;
      color: var(--colors-primary);
      width: 100%;
    }

    button:disabled {
      color: var(--colors-gray-500);
      border-color: var(--colors-gray-500);
      cursor: not-allowed;
    }
  `;

  @property()
  action!: ChooseTile;

  @property()
  selectedTile!: number | null;

  render() {
    return html`
      <p>Choose a tile to place:</p>

      <div class="tile-rack">
        ${this.action.available.map(
          (tile) =>
            html`<button
              class="tile ${this.selectedTile === tile ? "selected" : ""}"
              @click="${() => this.dispatchEvent(createTileSelectEvent(tile))}"
            >
              ${TileUtils.getTileDisplay(tile)}
            </button>`
        )}
      </div>

      <button
        class="confirm-btn"
        ?disabled="${this.selectedTile === null}"
        @click="${() => this.dispatchEvent(createConfirmTilePlaceEvent())}"
      >
        Place Tile
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-choose-tile-action": AcquireGameActionsElement;
  }
}
