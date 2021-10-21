import { PlayerAction } from "../model/player-action";

const getCurrentTurn = (actions: PlayerAction[]): PlayerAction[] => {
  const turnStart =
    actions.map((action) => action.type).lastIndexOf("EndTurn") + 1;
  return actions.slice(turnStart);
};

export const ActionUtils = {
  getCurrentTurn,
};
