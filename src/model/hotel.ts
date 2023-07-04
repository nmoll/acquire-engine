import { GameConfig } from "../game-config";
import { SharesUtils } from "../utils/shares-utils";
import { HotelChainType } from "./hotel-chain-type";

export class Hotel {
  constructor(public type: HotelChainType, public boardSquareIds: number[]) {}

  getSize(): number {
    return this.boardSquareIds.length;
  }

  isActive(): boolean {
    return this.getSize() >= 2;
  }

  isSafe(): boolean {
    return this.getSize() >= GameConfig.hotel.safeSize;
  }

  isGameEndingSize(): boolean {
    return this.getSize() >= GameConfig.hotel.gameEndingSize;
  }

  getSharesCost(): number {
    return SharesUtils.getSharesCost(this.type, this.getSize());
  }

  getMajorityBonus(): number {
    return this.getSharesCost() * 10;
  }

  getMinorityBonus(): number {
    return this.getMajorityBonus() / 2;
  }
}
