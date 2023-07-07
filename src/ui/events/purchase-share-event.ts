import { HotelChainType } from "../../model";

export class PurchaseShareEvent extends CustomEvent<{
  hotelChain: HotelChainType;
}> {
  get hotelChain() {
    return this.detail.hotelChain;
  }
}

export const createPurchaseShareEvent = (hotelChain: HotelChainType) =>
  new PurchaseShareEvent("purchase-share", {
    detail: {
      hotelChain,
    },
  });
