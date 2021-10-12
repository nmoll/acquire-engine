import { RandomUtils } from "./random-utils";

describe("RandomUtils", () => {
  it("should return random number consistently based off seed", () => {
    const generator1 = RandomUtils.randomGenerator(1);

    expect(generator1()).toEqual(0.6270739405881613);
    expect(generator1()).toEqual(0.002735721180215478);
    expect(generator1()).toEqual(0.5274470399599522);

    const generator2 = RandomUtils.randomGenerator(2);

    expect(generator2()).toEqual(0.7342509443406016);
    expect(generator2()).toEqual(0.32499843230471015);
    expect(generator2()).toEqual(0.28529605525545776);
  });
});
