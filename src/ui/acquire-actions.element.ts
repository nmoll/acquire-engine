import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { HotelChainType } from "../model";
import { AvailableAction } from "../model/available-action";
import { IAvailableActionState } from "../model/available-action-state";
import { PlayerAction } from "../model/player-action";

export interface ActionRequestEvent {
  action: PlayerAction;
}

@customElement("acquire-actions")
export class AcquireActionsElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      padding: 1rem;
    }
  `;

  @property()
  playerId!: number;

  @property()
  availableActionState: IAvailableActionState | undefined;

  toggleFullScreen() {
    const element = document.body;

    const requestMethod =
      element.requestFullscreen ||
      (element as any).webkitRequestFullscreen ||
      (element as any).webkitRequestFullScreen ||
      (element as any).mozRequestFullScreen ||
      (element as any).msRequestFullscreen;

    if (requestMethod) {
      requestMethod.apply(element);
    }
  }

  onEndTurn() {
    this.dispatchEvent(
      new CustomEvent<ActionRequestEvent>("action-request", {
        detail: {
          action: {
            type: "EndTurn",
            playerId: this.playerId,
          },
        },
      })
    );
  }

  onStartHotelChain(hotelChain: HotelChainType) {
    this.dispatchEvent(
      new CustomEvent<ActionRequestEvent>("action-request", {
        detail: {
          action: {
            type: "StartHotelChain",
            playerId: this.playerId,
            hotelChain,
          },
        },
      })
    );
  }

  renderAction(action: AvailableAction) {
    switch (action.type) {
      case "ChooseTile":
        return html`<span>Choose a tile</span>`;
      case "ChooseHotelChain":
        return action.hotelChains.map(
          (hotelChain) =>
            html`<button @click="${() =>
              this.onStartHotelChain(hotelChain)}"">${hotelChain}</button>`
        );
      case "ChooseMergeDirection":
        return html`<span>Choose merge direction (not implemented)</span>`;
      case "ChooseShares":
        return html`<span>Choose shares (not implemented)</span>`;
      case "ChooseEndTurn":
        return html`<button @click="${() => this.onEndTurn()}">
          End Turn
        </button>`;
    }
  }

  render() {
    return html`<button @click="${() => this.toggleFullScreen()}">
        Fullscreen</button
      >${this.availableActionState?.map((action) =>
        this.renderAction(action)
      )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-actions": AcquireActionsElement;
  }
}
