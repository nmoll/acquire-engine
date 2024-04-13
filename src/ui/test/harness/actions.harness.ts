import { AcquireGameActionsElement } from "../../elements/game/actions/acquire-game-actions.element";
import { ChooseTileActionElement } from "../../elements/game/actions/choose-tile-action.element";
import { ChooseEndTurnActionElement } from "../../elements/game/actions/end-turn-action.element";

export class ActionsHarness {
    constructor(private el: AcquireGameActionsElement) { }

    async getAvailableActionText() {
        await this.el.updateComplete
        return this.el.shadowRoot!.textContent?.trim()
    }

    async getChooseTileMessage() {
        await this.el.updateComplete
        return this.getChooseTileEl().shadowRoot!.textContent;
    }

    async clickPlaceTile() {
        await this.el.updateComplete

        const placeTileBtn = this.getChooseTileEl().shadowRoot!.querySelector('[data-qa=placeTileBtn]') as HTMLButtonElement | null;
        if (!placeTileBtn) {
            throw new Error('Expected to find place tile button');
        }
        placeTileBtn.click();

        await this.el.updateComplete
    }

    async clickEndTurn() {
        await this.el.updateComplete

        const endTurnBtn = this.getEndTurnEl().shadowRoot!.querySelector('button');
        if (!endTurnBtn) {
            throw new Error('Expected to find end turn button');
        }

        endTurnBtn.click();

        await this.el.updateComplete
    }

    private getChooseTileEl(): ChooseTileActionElement {
        const chooseTileEl = this.el.shadowRoot!.querySelector('acquire-choose-tile-action')
        if (!chooseTileEl) {
            throw new Error('Expected to find <acquire-choose-tile-action> element');
        }
        return chooseTileEl;
    }

    private getEndTurnEl(): ChooseEndTurnActionElement {
        const endTurnEl = this.el.shadowRoot!.querySelector('acquire-end-turn-action');
        if (!endTurnEl) {
            throw new Error('Expected to find <acquire-end-turn-action> element');
        }
        return endTurnEl;
    }
}