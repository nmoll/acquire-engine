export class CloseHotelDetailsEvent extends CustomEvent<void> { }

export const createCloseHotelDetailsEvent = () =>
    new CloseHotelDetailsEvent("close-hotel-details", {});
