import {
  ALL_HOTELS,
  BoardSquareState,
  HotelChainType,
  IPlayerTurn
} from "../model";
import { ISharesState } from "../model/shares-state";
import { starterTilePlayed } from "./utils";

const intitialState: ISharesState = {};

const getExistingShares = (
  playerTurn: IPlayerTurn,
  hotel: HotelChainType,
  state: ISharesState
): number =>
  state[playerTurn.playerId] && state[playerTurn.playerId][hotel]
    ? state[playerTurn.playerId][hotel]
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
  const share = playerTurn.sharesPurchased.find(s => s.hotel === hotel);
  return share ? share.quantity : 0;
};

const getSoldShares = (
  playerTurn: IPlayerTurn,
  hotel: HotelChainType
): number => {
  if (!playerTurn.sharesSold) {
    return 0;
  }
  const share = playerTurn.sharesSold.find(s => s.hotel === hotel);
  return share ? share.quantity : 0;
};

const computeState = (
  playerTurn: IPlayerTurn,
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
          getSoldShares(playerTurn, hotel)
      }
    }),
    sharesState
  );
};

export const SharesEngine = {
  computeState
};
