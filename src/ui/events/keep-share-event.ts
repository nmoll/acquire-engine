import { HotelChainType } from "../../model";

export class KeepShareEvent extends CustomEvent<{
  hotelChain: HotelChainType;
}> {
  get hotelChain() {
    return this.detail.hotelChain;
  }
}

export const createKeepShareEvent = (hotelChain: HotelChainType) =>
  new KeepShareEvent("keep-share", {
    detail: {
      hotelChain,
    },
  });
