import { SharesUtils } from "../utils/shares-utils";
import { HotelChainType } from "./hotel-chain-type";

export class Hotel {
  constructor(public type: HotelChainType, public boardSquareIds: number[]) {}

  getSize(): number {
    return this.boardSquareIds.length;
  }

  getMajorityBonus(): number {
    return SharesUtils.getMajorityBonus(this.type, this.getSize());
  }

  getMinorityBonus(): number {
    return SharesUtils.getMinorityBonus(this.type, this.getSize());
  }
}
