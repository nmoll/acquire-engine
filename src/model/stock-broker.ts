import { GameConfig } from "../game-config";
import { Hotel } from "./hotel";
import { HotelChainType } from "./hotel-chain-type";
import { ISharesState } from "./shares-state";

export class StockBroker {
  constructor(private sharesState: ISharesState) {}

  getCashAwardedOnDissolve(hotels: Hotel[]): Record<string, number> {
    let cashAwarded: Record<string, number> = {};

    for (const hotel of hotels) {
      const { majorityShareholders, minorityShareholders } =
        this.getMajorityAndMinorityShareholders(hotel);

      majorityShareholders.forEach((shareholder) => {
        const bonus = hotel.getMajorityBonus();
        cashAwarded[shareholder] = Math.round(
          (cashAwarded[shareholder] ?? 0) + bonus / majorityShareholders.length
        );
      });

      minorityShareholders.forEach((shareholder) => {
        const bonus = hotel.getMinorityBonus();
        cashAwarded[shareholder] = Math.round(
          (cashAwarded[shareholder] ?? 0) + bonus / minorityShareholders.length
        );
      });
    }

    return cashAwarded;
  }

  getAvailableShares(hotelType: HotelChainType): number {
    return (
      GameConfig.hotel.shares -
      Object.values(this.sharesState).reduce(
        (total, shares) => total + (shares[hotelType] ?? 0),
        0
      )
    );
  }

  private getMajorityAndMinorityShareholders = (
    hotel: Hotel
  ): {
    majorityShareholders: string[];
    minorityShareholders: string[];
  } => {
    const playersWithShares = Object.entries(this.sharesState)
      .filter(([, shares]) => !!shares[hotel.type])
      .map(([playerId, shares]) => ({
        playerId,
        numShares: shares[hotel.type] ?? 0,
      }));

    if (playersWithShares.length === 1) {
      return {
        majorityShareholders: [playersWithShares[0].playerId],
        minorityShareholders: [playersWithShares[0].playerId],
      };
    }

    const majorityShareAmount = Math.max(
      ...playersWithShares.map((p) => p.numShares)
    );
    const majorityShareholders = playersWithShares
      .filter((p) => p.numShares === majorityShareAmount)
      .map((p) => p.playerId);

    if (majorityShareholders.length > 1) {
      return {
        majorityShareholders,
        minorityShareholders: majorityShareholders,
      };
    }

    const minorityShareAmount = Math.max(
      ...playersWithShares
        .filter((p) => p.numShares !== majorityShareAmount)
        .map((p) => p.numShares)
    );
    const minorityShareholders = playersWithShares
      .filter((p) => p.numShares === minorityShareAmount)
      .map((p) => p.playerId);

    return {
      majorityShareholders,
      minorityShareholders,
    };
  };
}
