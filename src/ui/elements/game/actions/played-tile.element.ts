import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TileUtils } from "../../../../utils/tile-utils";
import { TileLineConnectorService } from "../service/tile-line-connector.service";

@customElement("acquire-played-tile")
export class PlayedTileElement extends LitElement {
  static styles = css`
    :host {
      background: var(--colors-tile);
      color: var(--colors-gray-700);
      font-size: 0.875rem;
      aspect-ratio: 1/1;
      width: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  private tileLineConnector = new TileLineConnectorService();
  private windowResizeListener = () => {
    this.tileLineConnector.redraw(this);
  };

  constructor() {
    super();

    window.addEventListener("resize", this.windowResizeListener);
  }

  @property()
  tile!: number;

  render() {
    return html`${TileUtils.getTileDisplay(this.tile)}`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    setTimeout(() => {
      this.tileLineConnector.drawLineToCell(this);
    });
  }

  disconnectedCallback(): void {
    window.removeEventListener("resize", this.windowResizeListener);
    this.tileLineConnector.removeLine(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-played-tile": PlayedTileElement;
  }
}
