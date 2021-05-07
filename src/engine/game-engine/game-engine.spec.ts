import { BoardStateFactory } from "../../../test/factory/board-state.factory";
import { SharesStateFactory } from "../../../test/factory/shares-state.factory";
import {
  america,
  buys,
  imererial,
  player,
  plays,
  starts,
  turn,
} from "../../../test/helpers";
import { HotelChainType, IGameState, IPlayerTurn } from "../../model";
import { GameEngine } from "./game-engine";

describe("GameEngine", () => {
  it("should compute initial game state with no turns", () => {
    const turns: IPlayerTurn[] = [];

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
    };

    expect(GameEngine.computeGameState(turns)).toEqual(expectedState);
  });

  it("should compute game state with multiple turns", () => {
    const turns: IPlayerTurn[] = [
      turn(player(1), plays("5A")),
      turn(player(2), plays("2D")),
      turn(
        player(3),
        plays("3D"),
        buys([america(3)]),
        starts(HotelChainType.AMERICAN)
      ),
      turn(player(4), plays("4F"), buys([america(2)])),
      turn(player(1), plays("10D")),
      turn(player(2), plays("5G"), buys([america(3)])),
      turn(
        player(3),
        plays("5F"),
        buys([america(1), imererial(2)]),
        starts(HotelChainType.IMPERIAL)
      ),
      turn(player(4), plays("3F"), [america(3)]),
      turn(player(1), plays("3E")),
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
    };

    expect(GameEngine.computeGameState(turns)).toEqual(expectedState);
  });
});
