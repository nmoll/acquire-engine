import { HotelChainType, ISharesState } from "../../model";

const HOTELS_BY_CODE: Record<string, HotelChainType> = {
  A: "American",
  C: "Continental",
  F: "Festival",
  I: "Imperial",
  L: "Luxor",
  T: "Tower",
  W: "Worldwide",
};

const createSharesState = (diagram: string): ISharesState => {
  const rows = diagram.trim().split(/\n/);
  const hotelCodes: string[] = rows.shift()?.trim()?.split(/\s/) || [];

  const result: ISharesState = {};

  rows.forEach((row) => {
    const cols = row.trim().split(/\s/);
    const playerId = Number(cols.shift()?.replace("P", ""));

    result[playerId] = {
      American: 0,
      Continental: 0,
      Festival: 0,
      Imperial: 0,
      Luxor: 0,
      Tower: 0,
      Worldwide: 0,
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
