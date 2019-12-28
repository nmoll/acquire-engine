import { HotelChainType } from "./hotel-chain-type";

export interface ISharesState {
  [playerId: number]: {
    [HotelChainType.AMERICAN]?: number;
    [HotelChainType.CONTINENTAL]?: number;
    [HotelChainType.FESTIVAL]?: number;
    [HotelChainType.IMPERIAL]?: number;
    [HotelChainType.LUXOR]?: number;
    [HotelChainType.TOWER]?: number;
    [HotelChainType.WORLDWIDE]?: number;
  };
}
