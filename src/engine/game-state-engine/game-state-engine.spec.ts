import { it, describe, expect } from "vitest";
import { IGameState } from "../../model";
import { IAcquireGameInstance } from "../../model/acquire-game-instance";
import { AvailableActionType } from "../../model/available-action";
import { PlayerAction, PlayerActionType } from "../../model/player-action";
import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { createGameInstance } from "../../test/factory/game-instance.factory";
import { SharesStateFactory } from "../../test/factory/shares-state.factory";
import { tile } from "../../test/helpers";
import { GameStateEngine } from "./game-state-engine";
import { PlayerActionResult } from "../../model/player-action-result";

describe("GameStateEngine", () => {
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
        1: [tile("12A"), tile("8A"), tile("4F"), tile("5G"), tile("11D")],
        2: [tile("12I"), tile("4B"), tile("12F"), tile("4G"), tile("3E")],
        3: [tile("11I"), tile("6C"), tile("10G"), tile("8G"), tile("6I")],
        4: [tile("6F"), tile("1F"), tile("9C"), tile("11F"), tile("10B")],
      },
      sharesState: SharesStateFactory.createSharesState(`
           A C F I L T W
        P1 0 0 0 0 0 0 0
        P2 0 0 0 0 0 0 0
        P3 0 0 0 0 0 0 0
        P4 0 0 0 0 0 0 0
      `),
      currentPlayerIdState: "1",
      availableActionsState: [
        AvailableActionType.ChooseTile({
          available: [
            tile("12A"),
            tile("8A"),
            tile("4F"),
            tile("5G"),
            tile("11D"),
          ],
          unavailable: [],
        }),
      ],
      previousActions: [],
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
      PlayerActionType.PlaceTile("1", tile("5G")),
      PlayerActionType.EndTurn("1"),

      PlayerActionType.PlaceTile("2", tile("4G")),
      PlayerActionType.StartHotelChain("2", "American"),
      PlayerActionType.PurchaseShares("2", "American"),
      PlayerActionType.PurchaseShares("2", "American"),
      PlayerActionType.PurchaseShares("2", "American"),
      PlayerActionType.EndTurn("2"),

      PlayerActionType.PlaceTile("3", tile("6C")),
      PlayerActionType.PurchaseShares("3", "American"),
      PlayerActionType.EndTurn("3"),

      PlayerActionType.PlaceTile("4", tile("6F")),
      PlayerActionType.EndTurn("4"),

      PlayerActionType.PlaceTile("1", tile("4F")),
      PlayerActionType.PurchaseShares("1", "American"),
      PlayerActionType.PurchaseShares("1", "American"),
      PlayerActionType.PurchaseShares("1", "American"),
      PlayerActionType.EndTurn("1"),

      PlayerActionType.PlaceTile("2", tile("4D")),
      PlayerActionType.PurchaseShares("2", "American"),
      PlayerActionType.EndTurn("2"),

      PlayerActionType.PlaceTile("3", tile("10H")),
      PlayerActionType.PurchaseShares("3", "American"),
      PlayerActionType.PurchaseShares("3", "American"),
      PlayerActionType.PurchaseShares("3", "American"),
      PlayerActionType.EndTurn("3"),

      PlayerActionType.PlaceTile("4", tile("1F")),
      PlayerActionType.EndTurn("4"),

      PlayerActionType.PlaceTile("1", tile("8A")),
      PlayerActionType.EndTurn("1"),
    ];

    const expectedState: IGameState = {
      boardState: BoardStateFactory.createBoardState(` 
          - - - - - - - 0 - - - -
          - - - - - - - - - - - -
          - - - - - 0 - - - - - -
          - - - 0 - - - - - - - - 
          - - - - - - - - - - - -
          0 - - A - 0 - - - - - -
          - - - A A - - - - - - - 
          - - - - - - - - - 0 - -
          - - - - - - - - - - - -`),
      cashState: {
        1: 4800,
        2: 4700,
        3: 4500,
        4: 6000,
      },
      tileState: {
        1: [tile("12A"), tile("11D"), tile("7C"), tile("2I"), tile("10A")],
        2: [tile("12I"), tile("4B"), tile("12F"), tile("3E"), tile("3C")],
        3: [tile("11I"), tile("10G"), tile("8G"), tile("6I"), tile("2G")],
        4: [tile("9C"), tile("11F"), tile("10B"), tile("8B"), tile("7B")],
      },
      sharesState: SharesStateFactory.createSharesState(
        `
             A C F I L T W
          P1 3 0 0 0 0 0 0
          P2 5 0 0 0 0 0 0
          P3 4 0 0 0 0 0 0
          P4 0 0 0 0 0 0 0
          `
      ),
      currentPlayerIdState: "2",
      availableActionsState: [
        AvailableActionType.ChooseTile({
          available: [
            tile("12I"),
            tile("4B"),
            tile("12F"),
            tile("3E"),
            tile("3C"),
          ],
          unavailable: [],
        }),
      ],
      previousActions: [
        PlayerActionResult.TilePlaced("3", tile("10H")),
        PlayerActionResult.SharesPurchased("3", "American"),
        PlayerActionResult.SharesPurchased("3", "American"),
        PlayerActionResult.SharesPurchased("3", "American"),
        PlayerActionResult.TurnEnded("3"),
        PlayerActionResult.TilePlaced("4", tile("1F")),
        PlayerActionResult.TurnEnded("4"),
        PlayerActionResult.TilePlaced("1", tile("8A")),
        PlayerActionResult.TurnEnded("1"),
      ],
    };

    expect(GameStateEngine.computeGameState(gameInstance, actions)).toEqual(
      expectedState
    );
  });
});
