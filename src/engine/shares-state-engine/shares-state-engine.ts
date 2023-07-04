import { GameConfig } from "../../game-config";
import { ALL_HOTELS, HotelChainType } from "../../model";
import { PlayerAction } from "../../model/player-action";
import { PlayerActionResult } from "../../model/player-action-result";
import { ISharesState } from "../../model/shares-state";

const getInitialState = (playerIds: string[]): ISharesState =>
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
    {} as ISharesState
  );

const computeState = (
  result: PlayerActionResult,
  sharesState: ISharesState
): ISharesState => {
  const playerAction = result.action;

  if (result.type === "Game Ended") {
    return getInitialState(Object.keys(sharesState));
  }

  return ALL_HOTELS.reduce(
    (state, hotel) => ({
      ...state,

      [playerAction.playerId]: {
        ...state[playerAction.playerId],
        [hotel]:
          getExistingShares(playerAction, hotel, state) +
          getStarterBonuses(playerAction, hotel) +
          getPurchasedShares(playerAction, hotel) +
          getSoldShares(playerAction, hotel) +
          getTradedShares(playerAction, hotel),
      },
    }),
    sharesState
  );
};

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

const getSoldShares = (
  playerAction: PlayerAction,
  hotel: HotelChainType
): number => {
  if (playerAction.type !== "SellOrphanedShare") {
    return 0;
  }

  return playerAction.hotelChain === hotel ? -1 : 0;
};

const getTradedShares = (
  playerAction: PlayerAction,
  hotel: HotelChainType
): number => {
  if (playerAction.type !== "TradeOrphanedShare") {
    return 0;
  }

  if (playerAction.hotelChain === hotel) {
    return -2;
  } else if (playerAction.hotelChainToReceive === hotel) {
    return 1;
  } else {
    return 0;
  }
};

export const SharesStateEngine = {
  getInitialState,
  computeState,
};
