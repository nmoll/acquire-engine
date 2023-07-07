import { HotelChainType } from "../../model";

export class StartHotelChainEvent extends CustomEvent<{
  hotelChain: HotelChainType;
}> {
  get hotelChain() {
    return this.detail.hotelChain;
  }
}

export const createStartHotelChainEvent = (hotelChain: HotelChainType) =>
  new StartHotelChainEvent("start-hotel-chain", {
    detail: {
      hotelChain,
    },
  });
