import { SharesStateFactory } from "../../../test/factory/shares-state.factory";
import { HotelChainType } from "../../model";
import { PlayerAction, PlayerActionType } from "../../model/player-action";
import { SharesStateEngine } from "./shares-state-engine";

const expectStateWithAction = (
  sharesDiagram: string,
  playerIds: number[],
  action: PlayerAction | null
) =>
  expect(
    SharesStateEngine.computeState(
      playerIds,
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
  let playerIds: number[];

  beforeEach(() => {
    playerIds = [1, 2, 3, 4];
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

    it("should add shares to player for all shares purchased", () => {
      expectStateWithAction(
        `
             A C F I L T W
          P1 2 1 0 0 0 0 0
          P2 0 6 0 0 0 0 0
          P3 0 0 0 0 0 0 0
          P4 0 0 0 0 0 0 0
        `,
        playerIds,
        PlayerActionType.PurchaseShares(1, [
          {
            hotel: HotelChainType.AMERICAN,
            quantity: 1,
          },
          {
            hotel: HotelChainType.CONTINENTAL,
            quantity: 2,
          },
        ])
      ).toEqual(
        SharesStateFactory.createSharesState(
          `
              A C F I L T W
           P1 3 3 0 0 0 0 0
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
        PlayerActionType.StartHotelChain(2, HotelChainType.IMPERIAL)
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
        PlayerActionType.StartHotelChain(2, HotelChainType.IMPERIAL)
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
  });
});
