const randomFourDigits = (): number => 1000 + Math.round(Math.random() * 8999);

const assignId = (name: string): string => `${randomFourDigits()}_${name}`;

const getDisplayName = (id: string | undefined): string =>
  id?.split("_").slice(1).join("_") ?? "Unknown";

export const PlayerUtils = {
  assignId,
  getDisplayName,
};
