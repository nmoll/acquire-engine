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

  return (
    BoardStateFactory.createDiagram(state.boardState) +
    playerState +
    currentTurn
  );
};

const formatAction = (action: AvailableAction): string => {
  switch (action.type) {
    case "ChooseTile":
      return `Choose Tile`;
    case "ChooseHotelChain":
      return `Choose Hotel: ${action.hotelChains
        .map(formatHotelChain)
        .join(" ")}`;
    case "ChooseMergeDirection":
      return `Merge: ${action.options.map(formatHotelChain).join(" ")}`;
    case "ChooseShares":
      const options = Object.entries(action.availableShares)
        .filter(([, available]) => available)
        .map(([chain]) => formatHotelChain(chain))
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
  }
};

const formatHotelChain = (hotelChain: string): string =>
  hotelChain.substring(0, 1);

export const gameStateSnapshotSerializer = {
  test: isGameState,
  print,
};
