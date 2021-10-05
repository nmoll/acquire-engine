import { HotelChainType, IGameState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerAction, PlayerActionType } from "../../model/player-action";
import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { SharesStateFactory } from "../../test/factory/shares-state.factory";
import { america, getTilePosition } from "../../test/helpers";
import { ArrayUtils } from "../../utils/array-utils";
import { GameStateEngine } from "./game-state-engine";

describe("GameStateEngine", () => {
  it("should create tile map", () => {
    const toPos = (index: number): string => {
      const x = index % 12;
      const y = Math.floor(index / 12);
      return `${x + 1}${["A", "B", "C", "D", "E", "F", "G", "H", "I"][y]}`;
    };

    const result = ArrayUtils.makeNumArray(108).reduce(
      (res, idx) => ({
        ...res,
        [idx]: toPos(idx),
      }),
      {}
    );

    expect(result).toMatchSnapshot();
  });

  it("should compute initial game state with no actions", () => {
    const gameInstance: IAcquireGameInstance = {
      randomSeed: 1,
      playerIds: [1, 2, 3, 4],
    };
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
      cashState: {
        1: 6000,
        2: 6000,
        3: 6000,
        4: 6000,
      },
      tileState: {
        1: [
          getTilePosition("10A"),
          getTilePosition("11H"),
          getTilePosition("8H"),
          getTilePosition("7A"),
          getTilePosition("4A"),
        ],
        2: [
          getTilePosition("5D"),
          getTilePosition("11F"),
          getTilePosition("4H"),
          getTilePosition("8D"),
          getTilePosition("3G"),
        ],
        3: [
          getTilePosition("6E"),
          getTilePosition("6B"),
          getTilePosition("4B"),
          getTilePosition("5C"),
          getTilePosition("7I"),
        ],
        4: [
          getTilePosition("1H"),
          getTilePosition("8I"),
          getTilePosition("9H"),
          getTilePosition("5F"),
          getTilePosition("1F"),
        ],
      },
      sharesState: SharesStateFactory.createSharesState(`
            A C F I L T W
        P1 0 0 0 0 0 0 0
        P2 0 0 0 0 0 0 0
        P3 0 0 0 0 0 0 0
        P4 0 0 0 0 0 0 0
      `),
      currentPlayerIdState: 1,
    };

    expect(GameStateEngine.computeGameState(gameInstance, actions)).toEqual(
      expectedState
    );
  });

  it("should compute game state with multiple actions", () => {
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

    const expectedState: IGameState = {
      boardState: BoardStateFactory.createBoardState(` 
          - - - - - - - - - - - -
          - - - 0 - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - 0 - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - - 
          - - - - - - - A A - - -
          - - - - - - - - - - - -`),
      cashState: {
        1: 6000,
        2: 6000,
        3: 6000,
        4: 5100,
      },
      tileState: {
        1: [
          getTilePosition("10A"),
          getTilePosition("11H"),
          getTilePosition("7A"),
          getTilePosition("4A"),
          getTilePosition("10E"),
        ],
        2: [
          getTilePosition("5D"),
          getTilePosition("11F"),
          getTilePosition("4H"),
          getTilePosition("3G"),
          getTilePosition("9G"),
        ],
        3: [
          getTilePosition("6E"),
          getTilePosition("6B"),
          getTilePosition("5C"),
          getTilePosition("7I"),
          getTilePosition("3D"),
        ],
        4: [
          getTilePosition("1H"),
          getTilePosition("8I"),
          getTilePosition("5F"),
          getTilePosition("1F"),
        ],
      },
      sharesState: SharesStateFactory.createSharesState(
        `
             A C F I L T W
          P1 0 0 0 0 0 0 0
          P2 0 0 0 0 0 0 0
          P3 0 0 0 0 0 0 0
          P4 4 0 0 0 0 0 0
          `
      ),
      currentPlayerIdState: 4,
    };

    expect(GameStateEngine.computeGameState(gameInstance, actions)).toEqual(
      expectedState
    );
  });
});
