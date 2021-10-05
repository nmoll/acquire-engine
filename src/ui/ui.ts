import { html, render } from "lit-html";
import { america, getTilePosition } from "../../test/helpers";
import { GameStateEngine } from "../engine/game-state-engine/game-state-engine";
import { BoardSquareState, HotelChainType, IGameState } from "../model";
import { IAcquireGameInstance } from "../model/acquire-game-instance";
import { PlayerAction, PlayerActionType } from "../model/player-action";

const gameInstance: IAcquireGameInstance = {
  randomSeed: 1,
  playerIds: [1, 2, 3, 4],
};

const actions: PlayerAction[] = [
  PlayerActionType.PlaceTile(1, getTilePosition("8H")),
  PlayerActionType.EndTurn(1),

  PlayerActionType.PlaceTile(2, getTilePosition("8D")),
  PlayerActionType.EndTurn(2),

  PlayerActionType.PlaceTile(3, getTilePosition("4B")),
  PlayerActionType.EndTurn(3),

  PlayerActionType.PlaceTile(4, getTilePosition("9H")),
  PlayerActionType.StartHotelChain(4, HotelChainType.AMERICAN),
  PlayerActionType.PurchaseShares(4, [america(3)]),
];

const gameState: IGameState = GameStateEngine.computeGameState(
  gameInstance,
  actions
);

const getSquareClass = (squareState: BoardSquareState): string => {
  switch (squareState.type) {
    case "HasTile":
      return "bg-gray-300";
    case "HasHotelChain":
      return "bg-blue-300";
  }
  return "";
};

const boardTemplate = (boardState: BoardSquareState[]) => html`
  <div class="h-full grid grid-cols-12">
    ${boardState.map(
      (state) => html`<div class="border ${getSquareClass(state)}"></div>`
    )}
  </div>
`;

render(boardTemplate(gameState.boardState), document.body);
