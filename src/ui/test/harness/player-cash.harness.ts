import { PlayerCashElement } from "../../elements/game/player-cash.element";

export class PlayerCashHarness {
    constructor(private el: PlayerCashElement) { }

    getCash() {
        return this.el.shadowRoot!.textContent?.trim() ?? ""
    }
}