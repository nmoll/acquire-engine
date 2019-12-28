import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { PlayerTurnFactory } from "../../test/factory/player-turn.factory";
import {
  BoardSquareSelectedStateType,
  HotelChainType,
  IPlayerTurn
} from "../model";
import { BoardStateEngine } from "./board-state-engine";

const expectStateWithTurn = (diagram: string, turn: Partial<IPlayerTurn>) =>
  expect(
    BoardStateEngine.computeState(
      BoardStateFactory.createBoardState(diagram),
      PlayerTurnFactory.createPlayerTurn(turn)
    )
  );

const state = (diagram: string) => BoardStateFactory.createBoardState(diagram);

/**
 *  ------ LEGEND ------
 *  - : Empty square
 *  o : Square available for selection
 *  O : Square selected
 *  0 : Square has tile
 *  * : New hotel pending player decision
 *  A : American hotel
 *  C : Continental hotel
 *  F : Festival hotel
 *  I : Imperial hotel
 *  L : Luxor hotel
 *  T : Tower hotel
 *  W : Worldwide hotel
 */
describe("BoardStateEngine", () => {
  it("should return empty state if nothing provided", () => {
    expectStateWithTurn("", null).toEqual(
      state(
        `
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
      `
      )
    );
  });

  it("should return the current state if no player turn", () => {
    expectStateWithTurn(
      `
          - - T T - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - W W - - - - - -
          - - - - - W - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
        `,
      null
    ).toEqual(
      state(`
        - - T T - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - W W - - - - - -
        - - - - - W - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        `)
    );
  });

  it("should return the current state if selected square is outside the board", () => {
    expectStateWithTurn(
      `
          - - T T - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - W W - - - - - -
          - - - - - W - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
        `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.Unconfirmed(200)
      }
    ).toEqual(
      state(`
        - - T T - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - W W - - - - - -
        - - - - - W - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        `)
    );
  });

  it("should have no selected squares if player has no selection", () => {
    expectStateWithTurn(
      `
          - - T T - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - W W - - - - - -
          - - - - - W - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
        `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.None()
      }
    ).toEqual(
      state(`
        - - T T - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - W W - - - - - -
        - - - - - W - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        `)
    );
  });

  it("should set available for selection state for all player tiles", () => {
    expectStateWithTurn(
      `
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
    `,
      {
        boardSquareOptionIds: [2, 6, 32, 40, 58, 59, 73]
      }
    ).toEqual(
      state(
        `
      - - o - - - o - - - - -
      - - - - - - - - - - - -
      - - - - - - - - o - - -
      - - - - o - - - - - - -
      - - - - - - - - - - o o
      - - - - - - - - - - - -
      - o - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
    `
      )
    );
  });

  it("should select the unconfirmed selected square", () => {
    expectStateWithTurn(
      `
      - o - O o - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
    `,
      {
        boardSquareOptionIds: [1, 3, 4],
        boardSquareSelectedState: BoardSquareSelectedStateType.Unconfirmed(1)
      }
    ).toEqual(
      state(
        `
        - O - o o - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
    `
      )
    );
  });

  it("should set a tile on the confirmed selected square", () => {
    expectStateWithTurn(
      `
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(7)
      }
    ).toEqual(
      state(`
        - - - - - - - 0 - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        `)
    );
  });

  it("should mark the squares as pending hotel if a starter tile is played", () => {
    expectStateWithTurn(
      `
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - 0 - - - - - - -
      - - - - - - - - - - - -
      - - - - 0 - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
    `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(40)
      }
    ).toEqual(
      state(
        `
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - * - - - - - - -
        - - - - * - - - - - - -
        - - - - * - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
      `
      )
    );
  });

  it("should start AMERICAN if AMERICAN is selected with starter tile", () => {
    expectStateWithTurn(
      `
          - - o 0 - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
        `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(2),
        selectedHotelChain: HotelChainType.AMERICAN
      }
    ).toEqual(
      state(`
            - - A A - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
          `)
    );
  });

  it("should start CONTINTENTAL if CONTINTENTAL is selected with starter tile", () => {
    expectStateWithTurn(
      `
          - - A A - - - - - - - -
          - - - - - - - - - - - -
          * - - - - - - - - - - -
          * - - - - - - - - - - -
          * - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
        `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(36),
        selectedHotelChain: HotelChainType.CONTINENTAL
      }
    ).toEqual(
      state(`
            - - A A - - - - - - - -
            - - - - - - - - - - - -
            C - - - - - - - - - - -
            C - - - - - - - - - - -
            C - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
          `)
    );
  });

  it("should start FESTIVAL if FESTIVAL is selected with starter tile", () => {
    expectStateWithTurn(
      `
          - - A A - - - - - - - -
          - - - - - - - - - - - -
          C - o 0 - - - - - - - -
          C - - - - - - - - - - -
          C - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
        `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(26),
        selectedHotelChain: HotelChainType.FESTIVAL
      }
    ).toEqual(
      state(`
            - - A A - - - - - - - -
            - - - - - - - - - - - -
            C - F F - - - - - - - -
            C - - - - - - - - - - -
            C - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
          `)
    );
  });

  it("should start IMERIAL if IMERIAL is selected with starter tile", () => {
    expectStateWithTurn(
      `
            - - A A - - - - - - - -
            - - - - - - - - - - - -
            C - F F - - - - - - - -
            C - - - - - - - - - - -
            C - - - - - - - - - - -
            - - - - - - - - - 0 - -
            - - - - - - - - 0 o - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
          `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(81),
        selectedHotelChain: HotelChainType.IMPERIAL
      }
    ).toEqual(
      state(`
            - - A A - - - - - - - -
            - - - - - - - - - - - -
            C - F F - - - - - - - -
            C - - - - - - - - - - -
            C - - - - - - - - - - -
            - - - - - - - - - I - -
            - - - - - - - - I I - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
          `)
    );
  });

  it("should start LUXOR if LUXOR is selected with starter tile", () => {
    expectStateWithTurn(
      `
            - - A A - - - - - - 0 o
            - - - - - - - - - - - -
            C - F F - - - - - - - -
            C - - - - - - - - - - -
            C - - - - - - - - - - -
            - - - - - - - - - I - -
            - - - - - - - - I I - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
          `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(11),
        selectedHotelChain: HotelChainType.LUXOR
      }
    ).toEqual(
      state(`
      - - A A - - - - - - L L
      - - - - - - - - - - - -
      C - F F - - - - - - - -
      C - - - - - - - - - - -
      C - - - - - - - - - - -
      - - - - - - - - - I - -
      - - - - - - - - I I - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
    `)
    );
  });

  it("should start TOWER if TOWER is selected with starter tile", () => {
    expectStateWithTurn(
      `
      - - A A - - - - - - L L
      - - - - - - - - - - - -
      C - F F - - - - - - - -
      C - - - - - - - - - - -
      C - - - - - - - - - - -
      - - - - - - - - - I - -
      - - - - - - - - I I - -
      - - - - - - - - - - - *
      - - - - - - - - - - - *
    `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(107),
        selectedHotelChain: HotelChainType.TOWER
      }
    ).toEqual(
      state(`
      - - A A - - - - - - L L
      - - - - - - - - - - - -
      C - F F - - - - - - - -
      C - - - - - - - - - - -
      C - - - - - - - - - - -
      - - - - - - - - - I - -
      - - - - - - - - I I - -
      - - - - - - - - - - - T
      - - - - - - - - - - - T
    `)
    );
  });

  it("should start WORLDWIDE if WORLDWIDE is selected with starter tile", () => {
    expectStateWithTurn(
      `
      - - A A - - - - - - L L
      - - - - - - - - - - - -
      C - F F - - - - - - - -
      C - - - - - - - - - - -
      C - - - - - - - - - - -
      - - - - - - - - - I - -
      - - - - - - - - I I - -
      0 - - - - - - - - - - T
      o 0 - - - - - - - - - T
    `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(96),
        selectedHotelChain: HotelChainType.WORLDWIDE
      }
    ).toEqual(
      state(`
      - - A A - - - - - - L L
      - - - - - - - - - - - -
      C - F F - - - - - - - -
      C - - - - - - - - - - -
      C - - - - - - - - - - -
      - - - - - - - - - I - -
      - - - - - - - - I I - -
      W - - - - - - - - - - T
      W W - - - - - - - - - T
    `)
    );
  });

  it("should merge a smaller hotel into a bigger hotel", () => {
    expectStateWithTurn(
      `
          - - W W W - - - - - - -
          - - - - - - - - - - - -
          - - L L - - - - - - - -
          - - L L - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
        `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(14)
      }
    ).toEqual(
      state(`
            - - L L L - - - - - - -
            - - L - - - - - - - - -
            - - L L - - - - - - - -
            - - L L - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
          `)
    );
  });

  it("should grow a hotel if tile placed adjacent to it", () => {
    expectStateWithTurn(
      `
        - - - O - - - - - - - -
        - - - T T - - - - - - -
        - - - - T - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
      `,
      {
        boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(3)
      }
    ).toEqual(
      state(`
    - - - T - - - - - - - -
    - - - T T - - - - - - -
    - - - - T - - - - - - -
    - - - - - - - - - - - -
    - - - - - - - - - - - -
    - - - - - - - - - - - -
    - - - - - - - - - - - -
    - - - - - - - - - - - -
    - - - - - - - - - - - -
  `)
    );
  });
});
