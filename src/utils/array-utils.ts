import { RandomUtils } from "./random-utils";

const makeNumArray = (length: number): number[] =>
  Array.from(new Array(length)).map((_, idx) => idx);

const shuffle = <T>(arr: T[], seed: number): T[] => {
  const arrCopy = [...arr];
  let len = arrCopy.length,
    elem: T,
    i: number;
  const randomGenerator = RandomUtils.randomGenerator(seed);

  while (len) {
    // Pick a remaining element…
    i = Math.floor(randomGenerator() * len--);

    // And swap it with the current element.
    elem = arrCopy[len];
    arrCopy[len] = arrCopy[i];
    arrCopy[i] = elem;
    ++seed;
  }

  return arrCopy;
};

const unique = <T>(arr: T[]): T[] => Array.from(new Set(arr));

export const ArrayUtils = {
  shuffle,
  makeNumArray,
  unique,
};
