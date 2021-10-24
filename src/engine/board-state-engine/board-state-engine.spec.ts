import { PlayerAction, PlayerActionType } from "../../model/player-action";
import { BoardStateFactory } from "../../test/factory/board-state.factory";
import { tile } from "../../test/helpers";
import { BoardStateEngine } from "./board-state-engine";

const expectStateWithAction = (diagram: string, action: PlayerAction | null) =>
  expect(
    BoardStateEngine.computeState(
      action,
      BoardStateFactory.createBoardState(diagram)
    )
  );

const placeTile = (tileLabel: string) =>
  PlayerActionType.PlaceTile("1", tile(tileLabel));

const state = (diagram: string) => BoardStateFactory.createBoardState(diagram);

/**
 *  ------ LEGEND ------
 *  - : Empty square
 *  0 : Square has tile
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
    expectStateWithAction("", null).toEqual(
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

  it("should return the current state if no player action", () => {
    expectStateWithAction(
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
    expectStateWithAction(
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
      placeTile("13A")
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

  it("should place tile on the correct position", () => {
    expectStateWithAction(
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
      placeTile("2A")
    ).toEqual(
      state(
        `
        - 0 - - - - - - - - - -
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

  // it("should mark the squares as pending hotel if a starter tile is played", () => {
  //   expectStateWithAction(
  //     `
  //     - - - - - - - - - - - -
  //     - - - - - - - - - - - -
  //     - - - - 0 - - - - - - -
  //     - - - - - - - - - - - -
  //     - - - - 0 - - - - - - -
  //     - - - - - - - - - - - -
  //     - - - - - - - - - - - -
  //     - - - - - - - - - - - -
  //     - - - - - - - - - - - -
  //   `,
  //     placeTile("5D")
  //   ).toEqual(
  //     state(
  //       `
  //       - - - - - - - - - - - -
  //       - - - - - - - - - - - -
  //       - - - - 0 - - - - - - -
  //       - - - - 0 - - - - - - -
  //       - - - - 0 - - - - - - -
  //       - - - - - - - - - - - -
  //       - - - - - - - - - - - -
  //       - - - - - - - - - - - -
  //       - - - - - - - - - - - -
  //     `
  //     )
  //   );
  // });

  it("should start American if American is selected with starter tile", () => {
    expectStateWithAction(
      `
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - 0 - - - - - - -
      - - - - 0 - - - - - - -
      - - - - 0 - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
        `,
      PlayerActionType.StartHotelChain("1", "American")
    ).toEqual(
      state(`
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - A - - - - - - -
      - - - - A - - - - - - -
      - - - - A - - - - - - - 
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
      - - - - - - - - - - - -
          `)
    );
  });

  it("should start Continental if Continental is selected with starter tile", () => {
    expectStateWithAction(
      `
          - - A A - - - - - - - -
          - - - - - - - - - - - -
          0 - - - - - - - - - - -
          0 - - - - - - - - - - -
          0 - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
        `,
      PlayerActionType.StartHotelChain("1", "Continental")
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

  it("should start Festival if Festival is selected with starter tile", () => {
    expectStateWithAction(
      `
          - - A A - - - - - - - -
          - - - - - - - - - - - -
          C - 0 0 - - - - - - - -
          C - - - - - - - - - - -
          C - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
        `,
      PlayerActionType.StartHotelChain("1", "Festival")
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
    expectStateWithAction(
      `
            - - A A - - - - - - - -
            - - - - - - - - - - - -
            C - F F - - - - - - - -
            C - - - - - - - - - - -
            C - - - - - - - - - - -
            - - - - - - - - - 0 - -
            - - - - - - - - 0 0 - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
          `,
      PlayerActionType.StartHotelChain("1", "Imperial")
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

  it("should start Luxor if Luxor is selected with starter tile", () => {
    expectStateWithAction(
      `
            - - A A - - - - - - 0 0
            - - - - - - - - - - - -
            C - F F - - - - - - - -
            C - - - - - - - - - - -
            C - - - - - - - - - - -
            - - - - - - - - - I - -
            - - - - - - - - I I - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
          `,
      PlayerActionType.StartHotelChain("1", "Luxor")
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

  it("should start Tower if Tower is selected with starter tile", () => {
    expectStateWithAction(
      `
      - - A A - - - - - - L L
      - - - - - - - - - - - -
      C - F F - - - - - - - -
      C - - - - - - - - - - -
      C - - - - - - - - - - -
      - - - - - - - - - I - -
      - - - - - - - - I I - -
      - - - - - - - - - - - 0
      - - - - - - - - - - - 0
    `,
      PlayerActionType.StartHotelChain("1", "Tower")
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

  it("should start Worldwide if Worldwide is selected with starter tile", () => {
    expectStateWithAction(
      `
      - - A A - - - - - - L L
      - - - - - - - - - - - -
      C - F F - - - - - - - -
      C - - - - - - - - - - -
      C - - - - - - - - - - -
      - - - - - - - - - I - -
      - - - - - - - - I I - -
      0 - - - - - - - - - - T
      0 0 - - - - - - - - - T
    `,
      PlayerActionType.StartHotelChain("1", "Worldwide")
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
    expectStateWithAction(
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
      placeTile("3B")
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

    expectStateWithAction(
      `
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - L L L L L - - - - - -
          - - - - L L - - - - - -
          - - - - - - C C - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
          - - - - - - - - - - - -
        `,
      placeTile("6F")
    ).toEqual(
      state(
        `
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - L L L L L - - - - - -
            - - - - L L - - - - - -
            - - - - - L L L - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
            - - - - - - - - - - - -
          `
      )
    );
  });

  it("should grow a hotel if tile placed adjacent to it", () => {
    expectStateWithAction(
      `
        - - 0 - - - - - - - - -
        - - - T T - - - - - - -
        - - - - T - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
      `,
      placeTile("4A")
    ).toEqual(
      state(`
    - - T T - - - - - - - -
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

describe("BUG CASE - minor hotel not merging into majority hotel", () => {
  it("should merge properly", () => {
    const boardState = BoardStateFactory.createBoardState(
      `
        - - - - - - - 0 - - - -
        - 0 - 0 - C - - W W - -
        F - 0 - - C C - - - L L
        F - - - I - - I - - - L 
        - - 0 - I I I I - - - L
        - - - - I - I - 0 - 0 -
        - - - - - - - - - - - 0
        - - 0 - A A - - - T T -
        - 0 - - - - 0 - 0 - T -
      `
    );

    const action: PlayerAction = {
      type: "PlaceTile",
      playerId: "1",
      boardSquareId: tile("7D"),
    };

    expect(BoardStateEngine.computeState(action, boardState)).toEqual(
      BoardStateFactory.createBoardState(
        `
      - - - - - - - 0 - - - -
      - 0 - 0 - I - - W W - -
      F - 0 - - I I - - - L L
      F - - - I - I I - - - L
      - - 0 - I I I I - - - L
      - - - - I - I - 0 - 0 -
      - - - - - - - - - - - 0
      - - 0 - A A - - - T T -
      - 0 - - - - 0 - 0 - T -
    `
      )
    );
  });
});
