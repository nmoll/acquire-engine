import { GameConfig } from "../../game-config";
import { HotelChainType, IGameState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { IAvailableActionState } from "../../model/available-action-state";
import { PlayerAction, PlayerActionType } from "../../model/player-action";
import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { createGameInstance } from "../../test/factory/game-instance.factory";
import { SharesStateFactory } from "../../test/factory/shares-state.factory";
import { getTilePosition } from "../../test/helpers";
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
      PlayerActionType.PurchaseShares("2", HotelChainType.AMERICAN),
      PlayerActionType.PurchaseShares("2", HotelChainType.AMERICAN),
      PlayerActionType.PurchaseShares("2", HotelChainType.AMERICAN),
      PlayerActionType.EndTurn("2"),
      PlayerActionType.PlaceTile("3", getTilePosition("6C")),
      PlayerActionType.PurchaseShares("3", HotelChainType.AMERICAN),
      PlayerActionType.EndTurn("3"),
      PlayerActionType.PlaceTile("4", getTilePosition("6F")),
      PlayerActionType.EndTurn("4"),
      PlayerActionType.PlaceTile("1", getTilePosition("4F")),
      PlayerActionType.PurchaseShares("1", HotelChainType.AMERICAN),
      PlayerActionType.PurchaseShares("1", HotelChainType.AMERICAN),
      PlayerActionType.PurchaseShares("1", HotelChainType.AMERICAN),
      PlayerActionType.EndTurn("1"),
      PlayerActionType.PlaceTile("2", getTilePosition("4D")),
      PlayerActionType.PurchaseShares("2", HotelChainType.AMERICAN),
      PlayerActionType.EndTurn("2"),
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
          getTilePosition("3C"),
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
      currentPlayerIdState: "3",
      availableActionsState: [
        {
          type: "ChooseTile",
        },
      ],
    };

    expect(GameStateEngine.computeGameState(gameInstance, actions)).toEqual(
      expectedState
    );
  });
});

describe("BUG CASE - User can purchase 4 stocks for a turn", () => {
  it("should not allow user to purchase stocks after 3 purchases in their turn", () => {
    const gameInstance: IAcquireGameInstance = {
      hostId: "4088_Nate",
      id: "7480568",
      playerIds: ["4088_Nate", "3044_Jake"],
      randomSeed: 40,
      state: "started",
    };

    const actions: PlayerAction[] = [
      {
        boardSquareId: 43,
        playerId: "4088_Nate",
        type: "PlaceTile",
      },
      {
        playerId: "4088_Nate",
        type: "EndTurn",
      },
      {
        boardSquareId: 40,
        playerId: "3044_Jake",
        type: "PlaceTile",
      },
      {
        playerId: "3044_Jake",
        type: "EndTurn",
      },
      {
        boardSquareId: 50,
        playerId: "4088_Nate",
        type: "PlaceTile",
      },
      {
        playerId: "4088_Nate",
        type: "EndTurn",
      },
      {
        boardSquareId: 76,
        playerId: "3044_Jake",
        type: "PlaceTile",
      },
      {
        playerId: "3044_Jake",
        type: "EndTurn",
      },
      {
        boardSquareId: 64,
        playerId: "4088_Nate",
        type: "PlaceTile",
      },
      {
        hotelChain: HotelChainType.AMERICAN,
        playerId: "4088_Nate",
        type: "StartHotelChain",
      },
      {
        hotelChain: HotelChainType.AMERICAN,
        playerId: "4088_Nate",
        type: "PurchaseShares",
      },
      {
        hotelChain: HotelChainType.AMERICAN,
        playerId: "4088_Nate",
        type: "PurchaseShares",
      },
      {
        hotelChain: HotelChainType.AMERICAN,
        playerId: "4088_Nate",
        type: "PurchaseShares",
      },
    ];

    const state = GameStateEngine.computeGameState(gameInstance, actions);
    const expected: IAvailableActionState = [
      {
        type: "ChooseEndTurn",
      },
    ];
    expect(state.availableActionsState).toEqual(expected);
  });
});
