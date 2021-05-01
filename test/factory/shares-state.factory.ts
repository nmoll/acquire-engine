import { HotelChainType } from "../../src";
import { ISharesState } from "../../src/model/shares-state";

const HOTELS_BY_CODE = {
  A: HotelChainType.AMERICAN,
  C: HotelChainType.CONTINENTAL,
  F: HotelChainType.FESTIVAL,
  I: HotelChainType.IMPERIAL,
  L: HotelChainType.LUXOR,
  T: HotelChainType.TOWER,
  W: HotelChainType.WORLDWIDE,
};

const createSharesState = (diagram: string): ISharesState => {
  const rows = diagram.trim().split(/\n/);
  const hotelCodes: string[] =
    rows
      .shift()
      ?.trim()
      ?.split(/\s/) || [];

  const result: ISharesState = {};

  rows.forEach((row) => {
    const cols = row.trim().split(/\s/);
    const playerId = Number(cols.shift()?.replace("P", ""));

    result[playerId] = {
      AMERICAN: 0,
      CONTINENTAL: 0,
      FESTIVAL: 0,
      IMPERIAL: 0,
      LUXOR: 0,
      TOWER: 0,
      WORLDWIDE: 0,
    };

    cols.forEach((col, idx) => {
      const hotel: HotelChainType =
        HOTELS_BY_CODE[hotelCodes[idx] as keyof typeof HOTELS_BY_CODE];
      result[playerId][hotel] = Number.parseInt(col, 10);
    });
  });

  return result;
};

export const SharesStateFactory = {
  createSharesState,
};
