import { AcquireGameElement } from "../../elements/game/acquire-game.element";
import { ActionsHarness } from "./actions.harness";
import { BoardHarness } from "./board.harness";
import { PlayersHarness } from "./game-players.harness";

export class GameHarness {
    constructor(private el: AcquireGameElement) { }

    getPlayersHarness(): PlayersHarness {
        const gamePlayersEl = this.el.shadowRoot!.querySelector('acquire-game-players')
        if (!gamePlayersEl) {
            throw new Error('no <acquire-game-players> element found');
        }
        return new PlayersHarness(gamePlayersEl)
    }

    getBoardHarness(): BoardHarness {
        const boardEl = this.el.shadowRoot!.querySelector('acquire-game-board');
        if (!boardEl) {
            throw new Error('no <acquire-game-board> element found');
        }
        return new BoardHarness(boardEl);
    }

    getActionsHarness(): ActionsHarness {
        const actionsEl = this.el.shadowRoot!.querySelector('acquire-game-actions');
        if (!actionsEl) {
            throw new Error('no <acquire-game-actions> element found');
        }
        return new ActionsHarness(actionsEl);
    }
}