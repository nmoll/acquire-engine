import { IGameState } from "../../model";
import { AvailableAction } from "../../model/available-action";
import { BoardStateFactory } from "../factory/board-state.factory";
import { formatTile } from "../factory/tile.factory";

const isGameState = (value: any): value is IGameState =>
  "boardState" in value && "cashState" in value;

const print = (state: any): string => {
  if (!isGameState(state)) {
    return "";
  }

  const playerIds = Object.keys(state.cashState);

  let playerState = "";
  playerIds.forEach((playerId) => {
    const cash = `$${state.cashState[playerId]}`;
    const tiles = state.tileState[playerId].map(formatTile).join(" ");
    const shares = Object.entries(state.sharesState[playerId])
      .filter(([, count]) => count > 0)
      .map(([chain, count]) => `${chain.substring(0, 1)}:${count}`)
      .join(" ");
    playerState += `\nP${playerId} | ${cash} | ${tiles} | ${shares}`;
  });

  const currentTurn = `\n\nP${
    state.currentPlayerIdState
  } ${state.availableActionsState
    .map((a) => `[${formatAction(a)}]`)
    .join(" ")}`;

  let gameEndMessage = "";
  if (state.winners && state.winners.length > 1) {
    gameEndMessage = `\n\n${state.winners.join(" and ")} win!`;
  } else if (state.winners && state.winners.length === 1) {
    gameEndMessage = `\n\n${state.winners[0]} wins!`;
  }

  return (
    BoardStateFactory.createDiagram(state.boardState) +
    playerState +
    currentTurn +
    gameEndMessage
  );
};

const formatAction = (action: AvailableAction): string => {
  switch (action.type) {
    case "ChooseTile":
      const available = action.available.map(formatTile).join(" ");
      const unavailable = action.unavailable.map(formatTile).join(" ");
      return `Choose Tile: ${available}${
        unavailable ? ` (unavailable: ${unavailable})` : ""
      }`;
    case "ChooseHotelChain":
      return `Choose Hotel: ${action.hotelChains
        .map(formatHotelChain)
        .join(" ")}`;
    case "ChooseMergeDirection":
      return `Merge: ${action.options.map(formatHotelChain).join(" ")}`;
    case "ChooseShares":
      const options = action.shares
        .map((share) => share.hotelChain)
        .map(formatHotelChain)
        .join(" ");
      return `Choose Shares: ${options}`;
    case "ChooseToSellOrphanedShare":
      return `Sell (1/${action.remainingShares}) ${action.hotelChain} Share`;
    case "ChooseToKeepOrphanedShare":
      return `Keep (1/${action.remainingShares}) ${action.hotelChain} Share`;
    case "ChooseToTradeOrphanedShare":
      return `Trade (2/${action.remainingShares}) ${action.hotelChain} for 1 ${action.hotelChainToReceive}`;
    case "ChooseEndTurn":
      return `End Turn`;
    case "ChooseEndGame":
      return `End Game`;
  }
};

const formatHotelChain = (hotelChain: string): string =>
  hotelChain.substring(0, 1);

export const gameStateSnapshotSerializer = {
  test: isGameState,
  print,
};
