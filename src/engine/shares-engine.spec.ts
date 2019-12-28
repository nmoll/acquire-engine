import { PlayerTurnFactory } from "../../test/factory/player-turn.factory";
import { SharesStateFactory } from "../../test/factory/shares-state.factory";
import { HotelChainType, IPlayerTurn } from "../model";
import { SharesEngine } from "./shares-engine";

const expectStateWithTurn = (diagram: string, turn: Partial<IPlayerTurn>) =>
  expect(
    SharesEngine.computeState(
      PlayerTurnFactory.createPlayerTurn(turn),
      SharesStateFactory.createSharesState(diagram)
    )
  );

describe("SharesEngine", () => {
  describe("computeShares", () => {
    it("should return 0 shares for each hotel if no shares have been purchased", () => {
      expectStateWithTurn("", {
        playerId: 1,
        seq: 0
      }).toEqual(
        SharesStateFactory.createSharesState(
          `
              A C F I L T W
           P1 0 0 0 0 0 0 0 
          `
        )
      );
    });

    it("should update player shares if shares were purchased", () => {
      // const turns = [
      //   PlayerTurnFactory.createPlayerTurn({
      //     playerId: 1
      //   }),
      //   PlayerTurnFactory.createPlayerTurn({
      //     playerId: 2
      //   }),
      //   PlayerTurnFactory.createPlayerTurn({
      //     playerId: 1
      //   }),
      //   PlayerTurnFactory.createPlayerTurn({
      //     playerId: 2,
      //     purchasedShares: [
      //       {
      //         hotel: HotelChainType.CONTINENTAL,
      //         quantity: 3
      //       }
      //     ]
      //   }),
      //   PlayerTurnFactory.createPlayerTurn({
      //     playerId: 1
      //   }),
      //   PlayerTurnFactory.createPlayerTurn({
      //     playerId: 2
      //   }),
      //   PlayerTurnFactory.createPlayerTurn({
      //     playerId: 1,
      //     purchasedShares: [
      //       {
      //         hotel: HotelChainType.AMERICAN,
      //         quantity: 2
      //       },
      //       {
      //         hotel: HotelChainType.CONTINENTAL,
      //         quantity: 1
      //       }
      //     ]
      //   }),
      //   PlayerTurnFactory.createPlayerTurn({
      //     playerId: 2,
      //     purchasedShares: [
      //       {
      //         hotel: HotelChainType.CONTINENTAL,
      //         quantity: 3
      //       }
      //     ]
      //   })
      // ];

      expectStateWithTurn(
        `
             A C F I L T W
          P1 2 1 0 0 0 0 0 
          P2 0 6 0 0 0 0 0
        `,
        {
          playerId: 1,
          purchasedShares: [
            {
              hotel: HotelChainType.AMERICAN,
              quantity: 1
            },
            {
              hotel: HotelChainType.CONTINENTAL,
              quantity: 2
            }
          ]
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

    // it("should give player free share if a hotel is started", () => {
    //   const turns: IPlayerTurn[] = [
    //     PlayerTurnFactory.createPlayerTurn({
    //       boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(0),
    //       playerId: 1
    //     }),
    //     PlayerTurnFactory.createPlayerTurn({
    //       boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(2),
    //       playerId: 2
    //     }),
    //     PlayerTurnFactory.createPlayerTurn({
    //       boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(1),
    //       playerId: 3,
    //       selectedHotelChain: HotelChainType.FESTIVAL
    //     }),
    //     PlayerTurnFactory.createPlayerTurn({
    //       playerId: 4
    //     })
    //   ];

    //   expect(SharesEngine.computeSharesState(turns)).toEqual(
    //     SharesStateFactory.createSharesState(`
    //           A C F I L T W
    //        P1 0 0 0 0 0 0 0
    //        P2 0 0 0 0 0 0 0
    //        P3 0 0 1 0 0 0 0
    //        P4 0 0 0 0 0 0 0
    //       `)
    //   );
    // });
  });
});
