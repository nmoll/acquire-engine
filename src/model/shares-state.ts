import { HotelChainType } from "./hotel-chain-type";

export interface ISharesState {
  [playerId: string]: {
    [HotelChainType.AMERICAN]?: number;
    [HotelChainType.CONTINENTAL]?: number;
    [HotelChainType.FESTIVAL]?: number;
    [HotelChainType.IMPERIAL]?: number;
    [HotelChainType.LUXOR]?: number;
    [HotelChainType.TOWER]?: number;
    [HotelChainType.WORLDWIDE]?: number;
  };
}
