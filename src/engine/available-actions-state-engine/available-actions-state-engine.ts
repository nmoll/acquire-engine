import { BoardSquareState } from "../../model";
import { IAvailableActionState } from "../../model/available-action-state";
import { CurrentPlayerIdState } from "../../model/current-player-id-state";
import { PlayerAction } from "../../model/player-action";
import { BoardUtils } from "../../utils/board-utils";

const computeState = (
  boardState: BoardSquareState[],
  action: PlayerAction | null = null
): IAvailableActionState => {
  if (!action || action?.type === "EndTurn") {
    return [
      {
        type: "ChooseTile",
      },
    ];
  }

  if (action.type === "PlaceTile") {
    if (BoardUtils.isHotelStarter(boardState, action.boardSquareId))
      return [
        {
          type: "ChooseHotelChain",
          hotelChains: BoardUtils.getInactiveHotelChains(boardState),
        },
      ];
  }

  return [
    {
      type: "ChooseEndTurn",
    },
  ];
};

const validateAction = (
  action: PlayerAction,
  availableActions: IAvailableActionState,
  currentPlayerIdState: CurrentPlayerIdState
): boolean => {
  if (action.playerId !== currentPlayerIdState) {
    return false;
  }

  switch (action.type) {
    case "PlaceTile":
      return !!availableActions.find((action) => action.type === "ChooseTile");
    case "StartHotelChain":
      return !!availableActions.find(
        (a) =>
          a.type === "ChooseHotelChain" &&
          a.hotelChains.includes(action.hotelChain)
      );
    case "EndTurn":
      return !!availableActions.find(
        (action) => action.type === "ChooseEndTurn"
      );
  }
  return true;
};

export const AvailableActionsStateEngine = {
  computeState,
  validateAction,
};
