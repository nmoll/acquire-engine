export const ALL_HOTELS = [
  "Luxor",
  "Tower",
  "American",
  "Festival",
  "Worldwide",
  "Continental",
  "Imperial",
] as const;

export type HotelChainType = typeof ALL_HOTELS[number];
