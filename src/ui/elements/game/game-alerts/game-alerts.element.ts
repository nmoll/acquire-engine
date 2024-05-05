import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SignalWatcher } from "@lit-labs/preact-signals";
import { ALL_HOTELS, IGameState } from "../../../../model";
import { PlayerUtils } from "../../../../utils/player-utils";
import "../player-cash.element";
import { consume } from "@lit/context";
import { modalServiceContext } from "../../../context/modal.service.context";
import { ModalService } from "../../modal/modal.service";
import "../hotel/hotel-name.element";
import { HotelMerged } from "../../../../model/player-action-result";

@customElement("acquire-game-alerts")
export class AcquireGameAlertsElement extends SignalWatcher(LitElement) {
  @consume({ context: modalServiceContext })
  modalService!: ModalService;

  @property()
  gameState: IGameState | null = null;

  private mergeEventSeen: string[] = [];

  render() {
    if (!this.gameState) {
      return;
    }

    const actionResult = this.gameState.actionResult;

    const mergeEvent =
      actionResult?.type === "Hotel Merged" ? actionResult : null;
    if (!mergeEvent) {
      return;
    }

    const gameStateKey = this.getGameStateKey(this.gameState);
    if (this.mergeEventSeen.includes(gameStateKey)) {
      return;
    }

    this.mergeEventSeen.push(gameStateKey);

    this.showMergeEventModal(mergeEvent);

    return;
  }

  private showMergeEventModal(mergeEvent: HotelMerged) {
    const player = PlayerUtils.getDisplayName(mergeEvent.action.playerId);
    const dissolved = mergeEvent.dissolved.map(
      (h) =>
        html`<acquire-hotel-name
          .hotelChainType="${h.type}"
        ></acquire-hotel-name>`
    );
    const survivor = html`<acquire-hotel-name
      .hotelChainType="${mergeEvent.survivor.type}"
    ></acquire-hotel-name>`;

    const awardedCash = Object.entries(mergeEvent.cashAwarded)
      .sort(([_pA, cashA], [_pB, cashB]) => cashB - cashA)
      .map(
        ([playerId, cash]) => html`
          <div style="display: flex; justify-content: space-between">
            <span>${PlayerUtils.getDisplayName(playerId)} awarded:</span>
            <acquire-player-cash .cash="${cash}"></acquire-player-cash>
          </div>
        `
      );

    this.modalService.open({
      title: `Merge Event`,
      template: html`
        <div data-qa="alert">
          <div>${player} merged ${dissolved} into ${survivor}</div>
          <div
            style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.25rem;"
          >
            ${awardedCash}
          </div>
        </div>
      `,
    });
  }

  /**
   * Returns a unique key for the state of the game
   * by hashing the board state. This is good enough
   * for the purposes of a merge event.
   */
  private getGameStateKey(gameState: IGameState) {
    let key = "";
    gameState.boardState.forEach((s) => {
      switch (s.type) {
        case "Default":
          key += "0";
          return;
        case "HasTile":
          key += "1";
          return;
        case "HasHotelChain":
          return ALL_HOTELS.indexOf(s.hotelChainType) + 2;
      }
    });
    return key;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "acquire-game-alerts": AcquireGameAlertsElement;
  }
}
