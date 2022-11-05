export const formatTile = (index: number): string => {
  const x = index % 12;
  const y = Math.floor(index / 12);
  return `[${x + 1}${["A", "B", "C", "D", "E", "F", "G", "H", "I"][y]}]`;
};
