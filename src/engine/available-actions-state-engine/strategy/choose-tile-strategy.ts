import { BoardSquareState } from "../../../model";
import {
  AvailableAction,
  AvailableActionType,
} from "../../../model/available-action";
import { HotelChainUtils } from "../../../utils/hotel-chain-utils";
import { AvailableActionStrategy } from "./available-action-strategy";
import { AvailablActionStrategyContext } from "./available-action-strategy-context";

export class ChooseTileStrategy implements AvailableActionStrategy {
  constructor(private context: AvailablActionStrategyContext) {}

  public isRequired() {
    return true;
  }

  public getAvailableActions(): AvailableAction[] {
    if (this.context.turnContext.actionResult.type === "Turn Ended") {
      return [
        AvailableActionType.ChooseTile(this.getAvailableAndUnavailableTiles()),
      ];
    }

    return [];
  }

  private getAvailableAndUnavailableTiles(): {
    available: number[];
    unavailable: number[];
  } {
    const available: number[] = [];
    const unavailable: number[] = [];

    const tiles = this.context.tileState[this.context.currentPlayerId];

    tiles.forEach((tile) => {
      if (this.isTilePlayable(tile, this.context.boardState)) {
        available.push(tile);
      } else {
        unavailable.push(tile);
      }
    });

    return {
      available,
      unavailable,
    };
  }

  private isTilePlayable(
    tile: number,
    boardState: BoardSquareState[]
  ): boolean {
    if (
      HotelChainUtils.isHotelStarter(boardState, tile) &&
      HotelChainUtils.getInactiveHotelChains(boardState).length === 0
    ) {
      return false;
    }

    return true;
  }
}
