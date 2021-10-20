import { GameConfig } from "../../game-config";
import { HotelChainType, IGameState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { PlayerAction, PlayerActionType } from "../../model/player-action";
import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { createGameInstance } from "../../test/factory/game-instance.factory";
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

    const result = ArrayUtils.makeNumArray(GameConfig.board.size).reduce(
      (res, idx) => ({
        ...res,
        [idx]: toPos(idx),
      }),
      {}
    );

    expect(result).toMatchSnapshot();
  });

  it("should compute initial game state with no actions", () => {
    const gameInstance: IAcquireGameInstance = createGameInstance({
      randomSeed: 1,
      playerIds: ["1", "2", "3", "4"],
    });
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
          getTilePosition("12A"),
          getTilePosition("8A"),
          getTilePosition("4F"),
          getTilePosition("5G"),
          getTilePosition("11D"),
        ],
        2: [
          getTilePosition("12I"),
          getTilePosition("4B"),
          getTilePosition("12F"),
          getTilePosition("4G"),
          getTilePosition("3E"),
        ],
        3: [
          getTilePosition("11I"),
          getTilePosition("6C"),
          getTilePosition("10G"),
          getTilePosition("8G"),
          getTilePosition("6I"),
        ],
        4: [
          getTilePosition("6F"),
          getTilePosition("1F"),
          getTilePosition("9C"),
          getTilePosition("11F"),
          getTilePosition("10B"),
        ],
      },
      sharesState: SharesStateFactory.createSharesState(`
            A C F I L T W
        P1 0 0 0 0 0 0 0
        P2 0 0 0 0 0 0 0
        P3 0 0 0 0 0 0 0
        P4 0 0 0 0 0 0 0
      `),
      currentPlayerIdState: "1",
      availableActionsState: [{ type: "ChooseTile" }],
    };

    expect(GameStateEngine.computeGameState(gameInstance, actions)).toEqual(
      expectedState
    );
  });

  it("should compute game state with multiple actions", () => {
    const gameInstance: IAcquireGameInstance = createGameInstance({
      randomSeed: 1,
      playerIds: ["1", "2", "3", "4"],
    });
    const actions: PlayerAction[] = [
      PlayerActionType.PlaceTile("1", getTilePosition("5G")),
      PlayerActionType.EndTurn("1"),
      PlayerActionType.PlaceTile("2", getTilePosition("4G")),
      PlayerActionType.StartHotelChain("2", HotelChainType.AMERICAN),
      PlayerActionType.PurchaseShares("2", [america(3)]),
      PlayerActionType.EndTurn("2"),
      PlayerActionType.PlaceTile("3", getTilePosition("6C")),
      PlayerActionType.PurchaseShares("3", [america(1)]),
      PlayerActionType.EndTurn("3"),
      PlayerActionType.PlaceTile("4", getTilePosition("6F")),
      PlayerActionType.EndTurn("4"),
      PlayerActionType.PlaceTile("1", getTilePosition("4F")),
      PlayerActionType.PurchaseShares("1", [america(3)]),
      PlayerActionType.EndTurn("1"),
      PlayerActionType.PlaceTile("2", getTilePosition("4D")),
      PlayerActionType.PurchaseShares("2", [america(1)]),
    ];

    const expectedState: IGameState = {
      boardState: BoardStateFactory.createBoardState(` 
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - 0 - - - - - -
          - - - 0 - - - - - - - -
          - - - - - - - - - - - -
          - - - A - 0 - - - - - -
          - - - A A - - - - - - - 
          - - - - - - - - - - - -
          - - - - - - - - - - - -`),
      cashState: {
        1: 4800,
        2: 4700,
        3: 5700,
        4: 6000,
      },
      tileState: {
        1: [
          getTilePosition("12A"),
          getTilePosition("8A"),
          getTilePosition("11D"),
          getTilePosition("7C"),
          getTilePosition("2I"),
        ],
        2: [
          getTilePosition("12I"),
          getTilePosition("4B"),
          getTilePosition("12F"),
          getTilePosition("3E"),
        ],
        3: [
          getTilePosition("11I"),
          getTilePosition("10G"),
          getTilePosition("8G"),
          getTilePosition("6I"),
          getTilePosition("10H"),
        ],
        4: [
          getTilePosition("1F"),
          getTilePosition("9C"),
          getTilePosition("11F"),
          getTilePosition("10B"),
          getTilePosition("8B"),
        ],
      },
      sharesState: SharesStateFactory.createSharesState(
        `
             A C F I L T W
          P1 3 0 0 0 0 0 0
          P2 5 0 0 0 0 0 0
          P3 1 0 0 0 0 0 0
          P4 0 0 0 0 0 0 0
          `
      ),
      currentPlayerIdState: "2",
      availableActionsState: [
        {
          type: "ChooseEndTurn",
        },
      ],
    };

    expect(GameStateEngine.computeGameState(gameInstance, actions)).toEqual(
      expectedState
    );
  });
});
