import {
  BoardSquareState,
  BoardSquareStateType,
  HasHotelChain,
} from "../../../model";
import { PlayerActionContext } from "../../../model/player-action-context";
import { Utils } from "../../../utils/utils";
import { IBoardStateScenario } from "./board-state-scenario";

export class ScenarioHasHotelChain implements IBoardStateScenario {
  resolve(context: PlayerActionContext): BoardSquareState | false {
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
      Utils.hasAdjacentTiles(context.boardState, context.index)
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

    const adjacentHotelChains = Utils.getAdjacentHotelChains(
      context.boardState,
      context.playerAction.boardSquareId
    );

    if (adjacentHotelChains.length < 2) {
      return false;
    }

    return {
      minority: Utils.getMinorityHotelChain(
        context.boardState,
        adjacentHotelChains
      ),
      majority: Utils.getLargestHotelChain(
        context.boardState,
        adjacentHotelChains
      ),
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

    const adjacentHotelChains = Utils.getAdjacentHotelChains(
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
}
