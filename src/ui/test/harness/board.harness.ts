import { BoardSquareState, BoardSquareStateType } from "../../../model";
import { BoardStateFactory } from "../../../test/factory/board-state.factory";
import { AcquireGameBoardElement } from "../../elements/game/acquire-game-board.element";

export class BoardHarness {
    private shadowRoot: ShadowRoot;

    constructor(private el: AcquireGameBoardElement) {
        this.shadowRoot = this.el.shadowRoot!;
    }

    async getBoardState(): Promise<BoardSquareState[]> {
        await this.el.updateComplete;

        const cells = this.shadowRoot.querySelectorAll<HTMLElement>('.cell');
        return Array.from(cells).map((cell) => {
            const borderColor = cell.style.borderColor;
            switch (borderColor) {
                case 'var(--colors-tile)':
                    return BoardSquareStateType.HasTile();
            }
            return BoardSquareStateType.Default();
        });
    }

    async getBoardDisplay(): Promise<string> {
        return BoardStateFactory.createDiagram(await this.getBoardState())
    }

    async clickSquare(id: number): Promise<void> {
        const square = this.el.shadowRoot!.getElementById(`cell-${id}`) as HTMLButtonElement | null;
        if (!square) {
            throw new Error(`No square found for id: ${id}`);
        }
        square.click();

        await this.el.updateComplete
    }
}