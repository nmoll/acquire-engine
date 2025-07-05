import { HotelChainType } from "../../model";

export class HotelSelectEvent extends CustomEvent<{ hotelType: HotelChainType }> {
    get hotelType() {
        return this.detail.hotelType;
    }
}

export const createHotelSelectEvent = (hotelType: HotelChainType) =>
    new HotelSelectEvent("hotel-select", {
        detail: {
            hotelType,
        },
    });
