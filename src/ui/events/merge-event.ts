import { HotelChainType } from "../../model";

export class MergeEvent extends CustomEvent<{
  survivor: HotelChainType;
  dissolve: HotelChainType[];
}> {
  get survivor() {
    return this.detail.survivor;
  }

  get dissolve() {
    return this.detail.dissolve;
  }
}

export const createMergeEvent = (merge: {
  survivor: HotelChainType;
  dissolve: HotelChainType[];
}) =>
  new MergeEvent("merge", {
    detail: {
      survivor: merge.survivor,
      dissolve: merge.dissolve,
    },
  });
