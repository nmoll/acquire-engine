import { IGameState } from "../../model";
import { AvailableAction } from "../../model/available-action";
import { IAvailableActionState } from "../../model/available-action-state";
import { PlayerAction } from "../../model/player-action";

// const isPlayerTurnEnd = (playerId: number, action: PlayerAction): boolean =>
//   action.type === "EndTurn" && action.playerId === playerId

const getPreviousAction = (
  playerId: number,
  actions: PlayerAction[]
): PlayerAction | undefined => {
  const lastAction = actions[actions.length - 1];
  if (!lastAction || lastAction.playerId === playerId) {
    return lastAction;
  }

  return getPreviousAction(playerId, actions.slice(0, -2));
};

const getAvailableActions = (
  playerId: number,
  actions: PlayerAction[]
): AvailableAction[] => {
  const previousAction = getPreviousAction(playerId, actions);
  if (!previousAction || previousAction?.type === "EndTurn") {
    return [
      {
        type: "ChooseTile",
      },
    ];
  }

  // if (previousAction.type === "PlaceTile") {
  //   return [
  //     {
  //       type: "ChooseHotelChain",
  //       hotelChains: [],
  //     },
  //   ];
  // }

  return [
    {
      type: "ChooseEndTurn",
    },
  ];
};

const computeState = (
  actions: PlayerAction[],
  gameState: IGameState
): IAvailableActionState => {
  if (!gameState.currentPlayerIdState) {
    return {};
  }

  return {
    [gameState.currentPlayerIdState]: getAvailableActions(
      gameState.currentPlayerIdState,
      actions
    ),
  };
};

export const AvailableActionsStateEngine = {
  computeState,
};
