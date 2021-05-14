import { RandomUtils } from "./random-utils";

describe("RandomUtils", () => {
  it("should return random number consistently based off seed", () => {
    const generator1 = RandomUtils.randomGenerator(1);

    expect(generator1()).toEqual(0.7098480789645691);
    expect(generator1()).toEqual(0.3875516056905326);
    expect(generator1()).toEqual(0.2053141528958804);
    expect(generator1()).toEqual(0.822400824921715);

    const generator2 = RandomUtils.randomGenerator(2);

    expect(generator2()).toEqual(0.9742682568175951);
    expect(generator2()).toEqual(0.8526838677025808);
    expect(generator2()).toEqual(0.3709910898542148);
    expect(generator2()).toEqual(0.24972602972775348);
  });
});
