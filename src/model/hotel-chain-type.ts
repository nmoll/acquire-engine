export const ALL_HOTELS = [
  "American",
  "Continental",
  "Festival",
  "Imperial",
  "Luxor",
  "Tower",
  "Worldwide",
] as const;

export type HotelChainType = typeof ALL_HOTELS[number];
