import { HotelChainType } from "../../model";

export class TradeShareEvent extends CustomEvent<{
  hotelChain: HotelChainType;
  hotelChainToReceive: HotelChainType;
}> {
  get hotelChain() {
    return this.detail.hotelChain;
  }

  get hotelChainToReceive() {
    return this.detail.hotelChainToReceive;
  }
}

export const createTradeShareEvent = (
  hotelChain: HotelChainType,
  hotelChainToReceive: HotelChainType
) =>
  new TradeShareEvent("trade-share", {
    detail: {
      hotelChain,
      hotelChainToReceive,
    },
  });
