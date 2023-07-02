import { SharesUtils } from "../utils/shares-utils";
import { Hotel } from "./hotel";
import { ISharesState } from "./shares-state";

export class StockBroker {
  constructor(private sharesState: ISharesState) {}

  getCashAwardedOnDissolve(hotel: Hotel): Record<string, number> {
    let cashAwarded: Record<string, number> = {};

    const { majorityShareholders, minorityShareholders } =
      SharesUtils.getMajorityAndMinorityShareholders(
        this.sharesState,
        hotel.type
      );

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

    return cashAwarded;
  }
}
