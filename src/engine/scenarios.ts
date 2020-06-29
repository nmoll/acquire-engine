import {
  BoardSquareState,
  BoardSquareStateType,
} from "../model/board-square-state";
import { IPlayerTurn } from "../model/player-turn";
import {
  getAdjacentHotelChains,
  getLargestHotelChain,
  hasAdjacentTiles,
  isPartOfMinorityHotelInMerge,
  isPendingHotel,
  isPlacedThisTurn,
  isTileAdjacentToConfirmedSelection,
  isUnconfirmedSelection,
  playerHasSelectedHotel,
  starterTilePlayed,
} from "./utils";

export const Scenarios = {
  getAvailableForSelectionState: (
    boardState: BoardSquareState[],
    playerTurn: IPlayerTurn,
    index: number
  ): BoardSquareState | false =>
    playerTurn.boardSquareSelectedState.type !== "Confirmed" &&
    playerTurn.boardSquareOptionIds.includes(index)
      ? BoardSquareStateType.AvailableForSelection()
      : false,

  getSelectedState: (
    boardState: BoardSquareState[],
    playerTurn: IPlayerTurn,
    index: number
  ): BoardSquareState | false =>
    isUnconfirmedSelection(playerTurn, index)
      ? BoardSquareStateType.Selected()
      : false,

  getHasTileState: (
    boardState: BoardSquareState[],
    playerTurn: IPlayerTurn,
    index: number
  ): BoardSquareState | false =>
    isPlacedThisTurn(playerTurn, index)
      ? BoardSquareStateType.HasTile()
      : false,

  getPendingHotelState: (
    boardState: BoardSquareState[],
    playerTurn: IPlayerTurn,
    index: number
  ): BoardSquareState | false =>
    (isPlacedThisTurn(playerTurn, index) &&
      hasAdjacentTiles(boardState, index)) ||
    isTileAdjacentToConfirmedSelection(boardState, playerTurn, index)
      ? BoardSquareStateType.PendingHotel()
      : false,

  getHasHotelChainState: (
    boardState: BoardSquareState[],
    playerTurn: IPlayerTurn,
    index: number
  ): BoardSquareState | false =>
    // Merge into bigger hotel
    (playerTurn.boardSquareSelectedState.type === "Confirmed" &&
    (isPlacedThisTurn(playerTurn, index) ||
      isPartOfMinorityHotelInMerge(boardState, playerTurn, index))
      ? getLargestHotelChain(
          boardState,
          getAdjacentHotelChains(
            boardState,
            playerTurn.boardSquareSelectedState.boardSquareId
          )
        )
      : false) ||
    // Starter tile played
    (starterTilePlayed(playerTurn, index, boardState)
      ? BoardSquareStateType.HasHotelChain(playerTurn.selectedHotelChain)
      : false) ||
    // Next to starter tile
    (isTileAdjacentToConfirmedSelection(boardState, playerTurn, index) &&
    playerHasSelectedHotel(playerTurn)
      ? BoardSquareStateType.HasHotelChain(playerTurn.selectedHotelChain)
      : false) ||
    // Hotel chosen
    (isPendingHotel(boardState, index) && playerHasSelectedHotel(playerTurn)
      ? BoardSquareStateType.HasHotelChain(playerTurn.selectedHotelChain)
      : false) ||
    false,

  getCurrentState: (
    boardState: BoardSquareState[],
    playerTurn: IPlayerTurn,
    index: number
  ): BoardSquareState => boardState[index],
};
