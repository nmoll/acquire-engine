import { PlayerActionResult } from "../../model/player-action-result";
import { createGameInstance } from "../../test/factory/game-instance.factory";
import { SharesStateFactory } from "../../test/factory/shares-state.factory";
import { SharesStateEngine } from "./shares-state-engine";

const expectStateWithAction = (
  sharesDiagram: string,
  playerIds: string[],
  action: PlayerActionResult | null
) =>
  expect(
    SharesStateEngine.computeState(
      createGameInstance({
        randomSeed: 1,
        playerIds,
      }),
      action,
      SharesStateFactory.createSharesState(sharesDiagram)
    )
  );

/**
 *  ------ LEGEND ------
 *  A  : American hotel
 *  C  : Continental hotel
 *  F  : Festival hotel
 *  I  : Imperial hotel
 *  L  : Luxor hotel
 *  T  : Tower hotel
 *  W  : Worldwide hotel
 *
 *  P1 : Player 1
 *  P2 : Player 2
 *  P3 : Player 3
 *  P4 : Player 4
 */
describe("SharesEngine", () => {
  let playerIds: string[];

  beforeEach(() => {
    playerIds = ["1", "2", "3", "4"];
  });

  describe("computeShares", () => {
    it("should return 0 shares for each hotel if no action has been played", () => {
      expectStateWithAction("", playerIds, null).toEqual(
        SharesStateFactory.createSharesState(
          `
              A C F I L T W
           P1 0 0 0 0 0 0 0 
           P2 0 0 0 0 0 0 0 
           P3 0 0 0 0 0 0 0 
           P4 0 0 0 0 0 0 0 
          `
        )
      );
    });

    it("should add shares to player shares purchased", () => {
      expectStateWithAction(
        `
             A C F I L T W
          P1 2 1 0 0 0 0 0
          P2 0 6 0 0 0 0 0
          P3 0 0 0 0 0 0 0
          P4 0 0 0 0 0 0 0
        `,
        playerIds,
        PlayerActionResult.SharesPurchased("1", "American")
      ).toEqual(
        SharesStateFactory.createSharesState(
          `
              A C F I L T W
           P1 3 1 0 0 0 0 0
           P2 0 6 0 0 0 0 0
           P3 0 0 0 0 0 0 0
           P4 0 0 0 0 0 0 0
          `
        )
      );
    });

    it("should give player free share if a hotel is started", () => {
      expectStateWithAction(
        `
           A C F I L T W
        P1 0 0 0 0 0 0 0
        P2 0 0 0 0 0 0 0
        P3 0 0 0 0 0 0 0
        P4 0 0 0 0 0 0 0
        `,
        playerIds,
        PlayerActionResult.HotelChainStarted("2", "Imperial", [])
      ).toEqual(
        SharesStateFactory.createSharesState(`
              A C F I L T W
           P1 0 0 0 0 0 0 0
           P2 0 0 0 1 0 0 0
           P3 0 0 0 0 0 0 0
           P4 0 0 0 0 0 0 0
           `)
      );
    });

    it("should give player free share if a hotel is started and player already has shares for hotel", () => {
      expectStateWithAction(
        `
           A C F I L T W
        P1 0 0 0 0 0 0 0
        P2 0 0 0 1 0 0 0
        P3 0 0 0 0 0 0 0
        P4 0 0 0 0 0 0 0
        `,
        playerIds,
        PlayerActionResult.HotelChainStarted("2", "Imperial", [])
      ).toEqual(
        SharesStateFactory.createSharesState(`
              A C F I L T W
           P1 0 0 0 0 0 0 0
           P2 0 0 0 2 0 0 0
           P3 0 0 0 0 0 0 0
           P4 0 0 0 0 0 0 0
           `)
      );
    });

    it("should remove share if sold", () => {
      expectStateWithAction(
        `
           A C F I L T W
        P1 4 0 0 0 0 0 0
        P2 0 0 0 1 0 0 0
        P3 0 0 0 0 0 0 0
        P4 0 0 0 0 0 0 0
        `,
        playerIds,
        PlayerActionResult.ShareSold("1", "American")
      ).toEqual(
        SharesStateFactory.createSharesState(`
              A C F I L T W
           P1 3 0 0 0 0 0 0
           P2 0 0 0 1 0 0 0
           P3 0 0 0 0 0 0 0
           P4 0 0 0 0 0 0 0
           `)
      );
    });

    it("should trade share 2 for 1 if traded", () => {
      expectStateWithAction(
        `
           A C F I L T W
        P1 4 0 0 3 0 0 0
        P2 0 0 0 1 0 0 0
        P3 0 0 0 0 0 0 0
        P4 0 0 0 0 0 0 0
        `,
        playerIds,
        PlayerActionResult.ShareTraded("1", "American", "Imperial")
      ).toEqual(
        SharesStateFactory.createSharesState(`
              A C F I L T W
           P1 2 0 0 4 0 0 0
           P2 0 0 0 1 0 0 0
           P3 0 0 0 0 0 0 0
           P4 0 0 0 0 0 0 0
           `)
      );
    });
  });
});
