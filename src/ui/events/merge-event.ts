import { HotelChainType } from "../../model";

export class MergeEvent extends CustomEvent<{
  hotelChainToKeep: HotelChainType;
  hotelChainToDissolve: HotelChainType;
}> {
  get hotelChainToKeep() {
    return this.detail.hotelChainToKeep;
  }

  get hotelChainToDissolve() {
    return this.detail.hotelChainToDissolve;
  }
}

export const createMergeEvent = (merge: {
  hotelChainToKeep: HotelChainType;
  hotelChainToDissolve: HotelChainType;
}) =>
  new MergeEvent("merge", {
    detail: {
      hotelChainToKeep: merge.hotelChainToKeep,
      hotelChainToDissolve: merge.hotelChainToDissolve,
    },
  });
