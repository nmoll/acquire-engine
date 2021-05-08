import {
  ALL_HOTELS,
  BoardSquareState,
  HotelChainType,
  IPlayerTurn,
} from "../../model";
import { PlayerAction } from "../../model/player-action";
import { ISharesState } from "../../model/shares-state";
import { starterTilePlayed } from "../../utils/utils";

const intitialState: ISharesState = {};

const getExistingShares = (
  playerTurn: IPlayerTurn,
  hotel: HotelChainType,
  state: ISharesState
): number =>
  state[playerTurn.playerId] && state[playerTurn.playerId][hotel]
    ? state[playerTurn.playerId][hotel] || 0
    : 0;

const getStarterBonuses = (
  playerTurn: IPlayerTurn,
  hotel: HotelChainType,
  boardState: BoardSquareState[]
): number =>
  playerTurn.selectedHotelChain === hotel &&
  playerTurn.boardSquareSelectedState.type === "Confirmed" &&
  starterTilePlayed(
    playerTurn,
    playerTurn.boardSquareSelectedState.boardSquareId,
    boardState
  )
    ? 1
    : 0;

const getPurchasedShares = (
  playerTurn: IPlayerTurn,
  hotel: HotelChainType
): number => {
  if (!playerTurn.sharesPurchased) {
    return 0;
  }
  const share = playerTurn.sharesPurchased.find((s) => s.hotel === hotel);
  return share ? share.quantity : 0;
};

const getSoldShares = (
  playerTurn: IPlayerTurn,
  hotel: HotelChainType
): number => {
  if (!playerTurn.sharesSold) {
    return 0;
  }
  const share = playerTurn.sharesSold.find((s) => s.hotel === hotel);
  return share ? share.quantity : 0;
};

const computeState = (
  playerTurn: IPlayerTurn | null,
  sharesState: ISharesState = intitialState,
  boardState: BoardSquareState[] = []
): ISharesState => {
  if (!playerTurn) {
    return sharesState;
  }

  return ALL_HOTELS.reduce(
    (state, hotel) => ({
      ...state,

      [playerTurn.playerId]: {
        ...state[playerTurn.playerId],
        [hotel]:
          getExistingShares(playerTurn, hotel, state) +
          getStarterBonuses(playerTurn, hotel, boardState) +
          getPurchasedShares(playerTurn, hotel) -
          getSoldShares(playerTurn, hotel),
      },
    }),
    sharesState
  );
};

const getExistingSharesWithAction = (
  playerAction: PlayerAction,
  hotel: HotelChainType,
  state: ISharesState
): number =>
  state[playerAction.playerId] && state[playerAction.playerId][hotel]
    ? state[playerAction.playerId][hotel] || 0
    : 0;

const getStarterBonusesWithAction = (
  playerAction: PlayerAction,
  hotel: HotelChainType
): number =>
  playerAction.type === "StartHotelChain" && playerAction.hotelChain === hotel
    ? 1
    : 0;

const getPurchasedSharesWithAction = (
  playerAction: PlayerAction,
  hotel: HotelChainType
): number => {
  if (playerAction.type !== "PurchaseShares") {
    return 0;
  }
  const share = playerAction.shares.find((s) => s.hotel === hotel);
  return share ? share.quantity : 0;
};

const computeStateWithAction = (
  playerAction: PlayerAction | null,
  sharesState: ISharesState = intitialState
): ISharesState => {
  if (!playerAction) {
    return sharesState;
  }

  return ALL_HOTELS.reduce(
    (state, hotel) => ({
      ...state,

      [playerAction.playerId]: {
        ...state[playerAction.playerId],
        [hotel]:
          getExistingSharesWithAction(playerAction, hotel, state) +
          getStarterBonusesWithAction(playerAction, hotel) +
          getPurchasedSharesWithAction(playerAction, hotel),
      },
    }),
    sharesState
  );
};

export const SharesEngine = {
  computeState,
  computeStateWithAction,
};
