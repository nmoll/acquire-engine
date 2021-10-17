import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { ICashState } from "../../model/cash-state";
import { PlayerAction } from "../../model/player-action";
import { SharesUtils } from "../../utils/shares-utils";

const startingAmount = 6000;

const fillEmptyStates = (
  playerIds: string[],
  cashState: ICashState
): ICashState =>
  playerIds.reduce(
    (state, playerId) => ({
      ...state,
      [playerId]:
        state[playerId] === undefined ? startingAmount : state[playerId],
    }),
    cashState
  );

const computeState = (
  gameInstance: IAcquireGameInstance,
  playerAction: PlayerAction | null = null,
  state: ICashState = {}
): ICashState => {
  state = fillEmptyStates(gameInstance.playerIds, state);

  if (!playerAction) {
    return state;
  }

  const purchasedShares =
    playerAction.type === "PurchaseShares" ? playerAction.shares : [];

  return {
    ...state,
    [playerAction.playerId]:
      state[playerAction.playerId] -
      SharesUtils.getTotalSharesCost(purchasedShares),
  };
};

export const CashStateEngine = {
  computeState,
};
