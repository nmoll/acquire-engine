import { PlayerSharesElement } from "../../elements/game/player-shares.element";

export class PlayerSharesHarness {
    constructor(private el: PlayerSharesElement) { }

    getShares() {
        return this.el.shadowRoot!.querySelector('[data-qa=visible]')!.textContent;
    }
}