import {
  BoardSquareState,
  BoardSquareStateType,
  HasHotelChain,
} from "../../../model";
import {
  IBoardSquareStateContext,
  PlayerActionContext,
  PlayerTurnContext,
} from "../../../model/board-square-state-context";
import {
  getAdjacentHotelChains,
  getLargestHotelChain,
  getMinorityHotelChain,
  hasAdjacentTiles,
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
    return context.type === "turn"
      ? this.resolveTurn(context)
      : this.resolveAction(context);
  }

  private resolveTurn(context: PlayerTurnContext): BoardSquareState | false {
    return (
      this.mergeIntoLargerHotel(context) ||
      this.starterTile(context) ||
      this.tileAjacentToStarter(context) ||
      this.selectedHotel(context)
    );
  }

  private resolveAction(context: PlayerActionContext): HasHotelChain | false {
    return (
      this.mergerTile(context) ||
      this.minorityMergedIntoMajority(context) ||
      this.newHotelStarted(context) ||
      this.growHotelChain(context)
    );
  }

  private newHotelStarted(context: PlayerActionContext): HasHotelChain | false {
    return context.playerAction.type === "StartHotelChain" &&
      context.boardState[context.index].type === "HasTile" &&
      hasAdjacentTiles(context.boardState, context.index)
      ? BoardSquareStateType.HasHotelChain(context.playerAction.hotelChain)
      : false;
  }

  private getMergeContext(
    context: PlayerActionContext
  ):
    | {
        minority: HasHotelChain;
        majority: HasHotelChain;
      }
    | false {
    if (context.playerAction.type !== "PlaceTile") {
      return false;
    }

    const adjacentHotelChains = getAdjacentHotelChains(
      context.boardState,
      context.playerAction.boardSquareId
    );

    if (adjacentHotelChains.length < 2) {
      return false;
    }

    return {
      minority: getMinorityHotelChain(context.boardState, adjacentHotelChains),
      majority: getLargestHotelChain(context.boardState, adjacentHotelChains),
    };
  }

  private mergerTile(context: PlayerActionContext): HasHotelChain | false {
    if (
      context.playerAction.type !== "PlaceTile" ||
      context.playerAction.boardSquareId !== context.index
    ) {
      return false;
    }

    const mergeContext = this.getMergeContext(context);
    if (!mergeContext) {
      return false;
    }

    return mergeContext.majority;
  }

  private minorityMergedIntoMajority(
    context: PlayerActionContext
  ): HasHotelChain | false {
    const mergeContext = this.getMergeContext(context);

    if (!mergeContext) {
      return false;
    }

    const squareState = context.boardState[context.index];

    return squareState.type === "HasHotelChain" &&
      squareState.hotelChainType === mergeContext.minority.hotelChainType
      ? mergeContext.majority
      : false;
  }

  private growHotelChain(context: PlayerActionContext): HasHotelChain | false {
    if (
      context.playerAction.type !== "PlaceTile" ||
      context.playerAction.boardSquareId !== context.index
    ) {
      return false;
    }

    const adjacentHotelChains = getAdjacentHotelChains(
      context.boardState,
      context.playerAction.boardSquareId
    );

    if (!adjacentHotelChains.length) {
      return false;
    }

    return BoardSquareStateType.HasHotelChain(
      adjacentHotelChains[0].hotelChainType
    );
  }

  private mergeIntoLargerHotel(
    context: PlayerTurnContext
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

  private starterTile(context: PlayerTurnContext): HasHotelChain | false {
    return context.playerTurn.selectedHotelChain &&
      starterTilePlayed(context.playerTurn, context.index, context.boardState)
      ? BoardSquareStateType.HasHotelChain(
          context.playerTurn.selectedHotelChain
        )
      : false;
  }

  private tileAjacentToStarter(
    context: PlayerTurnContext
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

  private selectedHotel(context: PlayerTurnContext): HasHotelChain | false {
    return context.playerTurn.selectedHotelChain &&
      isPendingHotel(context.boardState, context.index) &&
      playerHasSelectedHotel(context.playerTurn)
      ? BoardSquareStateType.HasHotelChain(
          context.playerTurn.selectedHotelChain
        )
      : false;
  }
}
