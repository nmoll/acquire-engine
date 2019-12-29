import { BoardSquareState, HotelChainType, IPlayerTurn } from "../model";
import { ISharesState } from "../model/shares-state";
import { starterTilePlayed } from "./utils";

const HOTELS = [
  HotelChainType.AMERICAN,
  HotelChainType.CONTINENTAL,
  HotelChainType.FESTIVAL,
  HotelChainType.IMPERIAL,
  HotelChainType.LUXOR,
  HotelChainType.TOWER,
  HotelChainType.WORLDWIDE
];

const computeState = (
  playerTurn: IPlayerTurn,
  sharesState: ISharesState,
  boardState: BoardSquareState[]
): ISharesState => {
  if (!sharesState) {
    sharesState = {};
  }
  if (!playerTurn) {
    return sharesState;
  }
  return HOTELS.reduce((state, hotel) => {
    state[playerTurn.playerId] = state[playerTurn.playerId] || {};
    state[playerTurn.playerId][hotel] = state[playerTurn.playerId][hotel] || 0;

    if (
      playerTurn.selectedHotelChain === hotel &&
      playerTurn.boardSquareSelectedState.type === "Confirmed"
    ) {
      if (
        starterTilePlayed(
          playerTurn,
          playerTurn.boardSquareSelectedState.boardSquareId,
          boardState
        )
      ) {
        state[playerTurn.playerId][hotel] += 1;
      }
    }

    if (playerTurn.sharesPurchased) {
      const share = playerTurn.sharesPurchased.find(s => s.hotel === hotel);
      if (share) {
        state[playerTurn.playerId][hotel] += share.quantity;
      }
    }

    if (playerTurn.sharesSold) {
      const share = playerTurn.sharesSold.find(s => s.hotel === hotel);
      if (share) {
        state[playerTurn.playerId][hotel] -= share.quantity;
      }
    }
    return state;
  }, sharesState);
};

export const SharesEngine = {
  computeState
};
