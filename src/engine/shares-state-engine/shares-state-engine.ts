import { GameConfig } from "../../game-config";
import { ALL_HOTELS, HotelChainType } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerAction } from "../../model/player-action";
import { ISharesState } from "../../model/shares-state";

const fillEmptyStates = (
  playerIds: string[],
  shareState: ISharesState
): ISharesState =>
  playerIds.reduce(
    (state, playerId) => ({
      ...state,
      [playerId]: ALL_HOTELS.reduce(
        (hotelState, hotel) => ({
          ...hotelState,
          [hotel]: (state[playerId] && state[playerId][hotel]) || 0,
        }),
        {}
      ),
    }),
    shareState
  );

const getExistingShares = (
  playerAction: PlayerAction,
  hotel: HotelChainType,
  state: ISharesState
): number => state[playerAction.playerId][hotel] ?? 0;

const getStarterBonuses = (
  playerAction: PlayerAction,
  hotel: HotelChainType
): number =>
  playerAction.type === "StartHotelChain" && playerAction.hotelChain === hotel
    ? GameConfig.hotel.starterBonus
    : 0;

const getPurchasedShares = (
  playerAction: PlayerAction,
  hotel: HotelChainType
): number => {
  if (playerAction.type !== "PurchaseShares") {
    return 0;
  }
  return playerAction.hotelChain === hotel ? 1 : 0;
};

const computeState = (
  gameInstance: IAcquireGameInstance,
  playerAction: PlayerAction | null = null,
  sharesState: ISharesState = {}
): ISharesState => {
  sharesState = fillEmptyStates(gameInstance.playerIds, sharesState);

  if (!playerAction) {
    return sharesState;
  }

  return ALL_HOTELS.reduce(
    (state, hotel) => ({
      ...state,

      [playerAction.playerId]: {
        ...state[playerAction.playerId],
        [hotel]:
          getExistingShares(playerAction, hotel, state) +
          getStarterBonuses(playerAction, hotel) +
          getPurchasedShares(playerAction, hotel),
      },
    }),
    sharesState
  );
};

export const SharesStateEngine = {
  computeState,
};
