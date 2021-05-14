import { BoardStateFactory } from "../../../test/factory/board-state.factory";
import { SharesStateFactory } from "../../../test/factory/shares-state.factory";
import { america, getTilePosition, imperial } from "../../../test/helpers";
import { HotelChainType, IGameState } from "../../model";
import { PlayerAction, PlayerActionType } from "../../model/player-action";
import { GameStateEngine } from "./game-state-engine";

describe("GameStateEngine", () => {
  it("should compute initial game state with no actions", () => {
    const playerIds = [1, 2, 3, 4];
    const actions: PlayerAction[] = [];

    const expectedState: IGameState = {
      boardState: BoardStateFactory.createBoardState(
        `
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -`
      ),
      cashState: {},
      sharesState: {},
      currentPlayerIdState: null,
    };

    expect(GameStateEngine.computeGameState(playerIds, actions)).toEqual(
      expectedState
    );
  });

  it("should compute game state with multiple actions", () => {
    const playerIds = [1, 2, 3, 4];
    const actions: PlayerAction[] = [
      PlayerActionType.PlaceTile(1, getTilePosition("5A")),

      PlayerActionType.PlaceTile(2, getTilePosition("2D")),

      PlayerActionType.PlaceTile(3, getTilePosition("3D")),
      PlayerActionType.StartHotelChain(3, HotelChainType.AMERICAN),
      PlayerActionType.PurchaseShares(3, [america(3)]),

      PlayerActionType.PlaceTile(4, getTilePosition("4F")),
      PlayerActionType.PurchaseShares(4, [america(2)]),

      PlayerActionType.PlaceTile(1, getTilePosition("10D")),

      PlayerActionType.PlaceTile(2, getTilePosition("5G")),
      PlayerActionType.PurchaseShares(2, [america(3)]),

      PlayerActionType.PlaceTile(3, getTilePosition("5F")),
      PlayerActionType.StartHotelChain(3, HotelChainType.IMPERIAL),
      PlayerActionType.PurchaseShares(3, [america(1), imperial(2)]),

      PlayerActionType.PlaceTile(4, getTilePosition("3F")),
      PlayerActionType.PurchaseShares(4, [america(3)]),

      PlayerActionType.PlaceTile(1, getTilePosition("3E")),
    ];

    const expectedState: IGameState = {
      boardState: BoardStateFactory.createBoardState(` 
          - - - - 0 - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - I I - - - - - - 0 - -
          - - I - - - - - - - - -
          - - I I I - - - - - - -
          - - - - I - - - - - - - 
          - - - - - - - - - - - -
          - - - - - - - - - - - -`),
      cashState: {
        1: 6000,
        2: 5100,
        3: 4200,
        4: 4500,
      },
      sharesState: SharesStateFactory.createSharesState(`
             A C F I L T W
          P1 0 0 0 0 0 0 0
          P2 3 0 0 0 0 0 0
          P3 5 0 0 3 0 0 0
          P4 5 0 0 0 0 0 0
          `),
      currentPlayerIdState: 1,
    };

    expect(GameStateEngine.computeGameState(playerIds, actions)).toEqual(
      expectedState
    );
  });
});
