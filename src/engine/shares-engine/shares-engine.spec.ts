import { BoardStateFactory } from "../../../test/factory/board-state.factory";
import { PlayerTurnFactory } from "../../../test/factory/player-turn.factory";
import { SharesStateFactory } from "../../../test/factory/shares-state.factory";
import {
  BoardSquareSelectedStateType,
  HotelChainType,
  IPlayerTurn,
} from "../../model";
import { SharesEngine } from "./shares-engine";

const expectStateWithTurn = (
  sharesDiagram: string,
  boardStateDiagram: string,
  turn: Partial<IPlayerTurn>
) =>
  expect(
    SharesEngine.computeState(
      PlayerTurnFactory.createPlayerTurn(turn),
      SharesStateFactory.createSharesState(sharesDiagram),
      BoardStateFactory.createBoardState(boardStateDiagram)
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
  describe("computeShares", () => {
    it("should return 0 shares for each hotel if no shares have been purchased", () => {
      expectStateWithTurn("", "", {
        playerId: 1,
        seq: 0,
      }).toEqual(
        SharesStateFactory.createSharesState(
          `
              A C F I L T W
           P1 0 0 0 0 0 0 0 
          `
        )
      );
    });

    it("should add shares to player for all shares purchased", () => {
      expectStateWithTurn(
        `
             A C F I L T W
          P1 2 1 0 0 0 0 0 
          P2 0 6 0 0 0 0 0
        `,
        "",
        {
          playerId: 1,
          sharesPurchased: [
            {
              hotel: HotelChainType.AMERICAN,
              quantity: 1,
            },
            {
              hotel: HotelChainType.CONTINENTAL,
              quantity: 2,
            },
          ],
        }
      ).toEqual(
        SharesStateFactory.createSharesState(
          `
              A C F I L T W
           P1 3 3 0 0 0 0 0 
           P2 0 6 0 0 0 0 0
          `
        )
      );
    });

    it("should remove shares from player for all shares sold", () => {
      expectStateWithTurn(
        `
               A C F I L T W
            P1 6 6 0 0 0 0 0 
            P2 0 6 2 0 0 0 0
          `,
        "",
        {
          playerId: 2,
          sharesSold: [
            {
              hotel: HotelChainType.CONTINENTAL,
              quantity: 1,
            },
            {
              hotel: HotelChainType.FESTIVAL,
              quantity: 2,
            },
          ],
        }
      ).toEqual(
        SharesStateFactory.createSharesState(
          `
                A C F I L T W
             P1 6 6 0 0 0 0 0 
             P2 0 5 0 0 0 0 0
            `
        )
      );
    });

    it("should give player free share if a hotel is started", () => {
      expectStateWithTurn(
        `A C F I L T W
        P1 0 0 0 0 0 0 0
        P2 0 0 0 0 0 0 0
        P3 0 0 0 0 0 0 0
        P4 0 0 0 0 0 0 0`,
        `
        - - 0 - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -
        - - - - - - - - - - - -`,
        {
          boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(3),
          playerId: 2,
          selectedHotelChain: HotelChainType.IMPERIAL,
        }
      ).toEqual(
        SharesStateFactory.createSharesState(`
              A C F I L T W
           P1 0 0 0 0 0 0 0
           P2 0 0 0 1 0 0 0
           P3 0 0 0 0 0 0 0
           P4 0 0 0 0 0 0 0`)
      );
    });
  });
});
