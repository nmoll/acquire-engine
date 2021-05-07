import {
  BoardSquareState,
  BoardSquareStateType,
  HasHotelChain,
} from "../../../model";
import { IBoardSquareStateContext } from "../../../model/board-square-state-context";
import {
  getAdjacentHotelChains,
  getLargestHotelChain,
  isPartOfMinorityHotelInMerge,
  isPendingHotel,
  isPlacedThisTurn,
  isTileAdjacentToConfirmedSelection,
  playerHasSelectedHotel,
  starterTilePlayed,
} from "../../../utils/utils";
import { IBoardStateScenario } from "./board-state-scenario";

export class ScenarioHasHotelChain implements IBoardStateScenario {
  resolve(context: IBoardSquareStateContext): BoardSquareState | false {
    return (
      this.mergeIntoLargerHotel(context) ||
      this.starterTile(context) ||
      this.tileAjacentToStarter(context) ||
      this.selectedHotel(context) ||
      false
    );
  }

  mergeIntoLargerHotel(
    context: IBoardSquareStateContext
  ): BoardSquareState | false {
    return context.playerTurn.boardSquareSelectedState.type === "Confirmed" &&
      (isPlacedThisTurn(context.playerTurn, context.index) ||
        isPartOfMinorityHotelInMerge(
          context.boardState,
          context.playerTurn,
          context.index
        ))
      ? getLargestHotelChain(
          context.boardState,
          getAdjacentHotelChains(
            context.boardState,
            context.playerTurn.boardSquareSelectedState.boardSquareId
          )
        )
      : false;
  }

  starterTile(context: IBoardSquareStateContext): HasHotelChain | false {
    return context.playerTurn.selectedHotelChain &&
      starterTilePlayed(context.playerTurn, context.index, context.boardState)
      ? BoardSquareStateType.HasHotelChain(
          context.playerTurn.selectedHotelChain
        )
      : false;
  }

  tileAjacentToStarter(
    context: IBoardSquareStateContext
  ): HasHotelChain | false {
    return context.playerTurn.selectedHotelChain &&
      isTileAdjacentToConfirmedSelection(
        context.boardState,
        context.playerTurn,
        context.index
      ) &&
      playerHasSelectedHotel(context.playerTurn)
      ? BoardSquareStateType.HasHotelChain(
          context.playerTurn.selectedHotelChain
        )
      : false;
  }

  selectedHotel(context: IBoardSquareStateContext): HasHotelChain | false {
    return context.playerTurn.selectedHotelChain &&
      isPendingHotel(context.boardState, context.index) &&
      playerHasSelectedHotel(context.playerTurn)
      ? BoardSquareStateType.HasHotelChain(
          context.playerTurn.selectedHotelChain
        )
      : false;
  }
}
