import { HotelChainType } from "../../model";

export class SellShareEvent extends CustomEvent<{
  hotelChain: HotelChainType;
}> {
  get hotelChain() {
    return this.detail.hotelChain;
  }
}

export const createSellShareEvent = (hotelChain: HotelChainType) =>
  new SellShareEvent("sell-share", {
    detail: {
      hotelChain,
    },
  });
