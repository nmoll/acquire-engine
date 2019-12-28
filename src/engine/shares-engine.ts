import { HotelChainType, IPlayerTurn } from "../model";
import { ISharesState } from "../model/shares-state";

const HOTELS = [
  HotelChainType.AMERICAN,
  HotelChainType.CONTINENTAL,
  HotelChainType.FESTIVAL,
  HotelChainType.IMPERIAL,
  HotelChainType.LUXOR,
  HotelChainType.TOWER,
  HotelChainType.WORLDWIDE
];

const computeCash = (playerId: number, turns: IPlayerTurn[]): number => {
  return 6000;
};

const computeState = (
  playerTurn: IPlayerTurn,
  sharesState: ISharesState
): ISharesState =>
  HOTELS.reduce((state, hotel) => {
    state[playerTurn.playerId] = state[playerTurn.playerId] || {};
    state[playerTurn.playerId][hotel] = state[playerTurn.playerId][hotel] || 0;

    // if (playerTurn.boardSquareSelectedState.type === "Confirmed") {
    //   if (
    //     starterTilePlayed(
    //       playerTurn,
    //       playerTurn.boardSquareSelectedState.boardSquareId,
    //       boardState
    //     )
    //   ) {
    //     state[playerTurn.playerId][hotel] += 1;
    //   }
    // }

    if (playerTurn.purchasedShares) {
      const share = playerTurn.purchasedShares.find(s => s.hotel === hotel);
      if (share) {
        state[playerTurn.playerId][hotel] += share.quantity;
      }
    }
    return state;
  }, sharesState);

const computeSharesState = (
  playerTurns: IPlayerTurn[],
  sharesState: ISharesState = {}
): ISharesState => {
  if (!playerTurns.length) {
    return sharesState;
  }
  const turns = [...playerTurns];

  return computeSharesState(turns, computeState(turns.shift(), sharesState));
};

export const SharesEngine = {
  computeCash,
  computeSharesState,
  computeState
};
