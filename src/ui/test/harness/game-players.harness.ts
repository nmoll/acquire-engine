import { ALL_HOTELS } from "../../../model";
import { AcquireGamePlayersElement } from "../../elements/game/acquire-game-players.element";
import { PlayerCashHarness } from "./player-cash.harness";
import { PlayerSharesHarness } from "./player-shares.harness";

export class PlayersHarness {
    constructor(private el: AcquireGamePlayersElement) { }

    async getPlayerHoldings() {
        await this.el.updateComplete
        const playerNames = this.getPlayerNameElements();
        const playerCash = this.getPlayerCashHarnesses();
        const playerShares = this.getPlayerShareHarnesses();

        return playerNames.map((_, i) => [
            playerNames[i]?.innerText.trim() ?? "",
            playerCash[i]?.getCash() ?? "",
            playerShares.slice(i * ALL_HOTELS.length, i * ALL_HOTELS.length + ALL_HOTELS.length).map(s => s.getShares())
        ])
    }

    private getPlayerNameElements(): HTMLElement[] {
        return Array.from(this.el.shadowRoot!.querySelectorAll<HTMLElement>('.player-name'))
    }

    private getPlayerCashHarnesses(): PlayerCashHarness[] {
        return Array.from(
            this.el.shadowRoot!.querySelectorAll('acquire-player-cash')
        ).map((el) => {
            return new PlayerCashHarness(el)
        });
    }

    private getPlayerShareHarnesses(): PlayerSharesHarness[] {
        return Array.from(
            this.el.shadowRoot!.querySelectorAll('acquire-player-shares')
        ).map(el => {
            return new PlayerSharesHarness(el)
        })
    }


}