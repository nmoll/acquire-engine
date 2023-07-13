import { AcquireGameService } from "../acquire-game.service";
import { PlayedTileElement } from "../actions/played-tile.element";

export class TileLineConnectorService {
  private lines = new Map<number, HTMLElement>();

  drawLineToCell(playedTileEl: PlayedTileElement) {
    const square = this.getSquareEl(playedTileEl.tile);
    if (!square) {
      return;
    }

    const actionLogOffsetTop =
      AcquireGameService.getInstance().gameActions?.offsetTop ?? 0;

    const fromX = square.offsetLeft + square.offsetWidth / 2;
    const fromY = square.offsetTop + square.offsetHeight / 2;
    const toX = playedTileEl.offsetLeft + playedTileEl.offsetWidth / 2;
    const toY = playedTileEl.offsetTop;

    const deltaX = Math.abs(toX - fromX);
    const deltaY = Math.abs(toY + actionLogOffsetTop - fromY);

    const line = document.createElement("div");
    line.style.position = "absolute";
    line.style.top = `${fromY}px`;
    if (fromX < toX) {
      line.style.left = `${fromX}px`;
    } else {
      line.style.left = `${fromX - deltaX}px`;
    }
    line.style.height = `${deltaY}px`;
    line.style.width = `${deltaX}px`;

    if (fromX < toX) {
      line.style.background =
        "linear-gradient(to top right, transparent calc(50% - 1px), var(--colors-primary), transparent calc(50% + 1px))";
    } else {
      line.style.background =
        "linear-gradient(to top left, transparent calc(50% - 1px), var(--colors-primary), transparent calc(50% + 1px))";
    }

    this.lines.set(playedTileEl.tile, line);

    AcquireGameService.getInstance().game?.appendGameObject(line);
  }

  removeLine(playedTileEl: PlayedTileElement) {
    const line = this.lines.get(playedTileEl.tile);
    line?.remove();
    this.lines.delete(playedTileEl.tile);
  }

  redraw(playedTileEl: PlayedTileElement) {
    this.removeLine(playedTileEl);
    this.drawLineToCell(playedTileEl);
  }

  private getSquareEl(tile: number) {
    const board = AcquireGameService.getInstance().gameBoard;
    if (!board) {
      return null;
    }

    return board.getSquareEl(tile);
  }
}
