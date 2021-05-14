type RandomGenerator = () => number;

const randomGenerator = (seed: number): RandomGenerator => {
  return () => {
    seed = Math.sin(seed) * 10000;
    return seed - Math.floor(seed);
  };
};

export const RandomUtils = {
  randomGenerator,
};
