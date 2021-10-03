import { ArrayUtils } from "./array-utils";

describe("ArrayUtils", () => {
  describe("shuffle", () => {
    let array: number[];

    beforeEach(() => {
      array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    });

    it("should shuffle array based on seed", () => {
      expect(ArrayUtils.shuffle(array, 1)).toMatchInlineSnapshot(`
        Array [
          5,
          3,
          10,
          9,
          7,
          1,
          6,
          2,
          4,
          8,
        ]
      `);

      expect(ArrayUtils.shuffle(array, 5)).toMatchInlineSnapshot(`
        Array [
          5,
          6,
          2,
          10,
          9,
          3,
          4,
          7,
          1,
          8,
        ]
      `);
    });

    it("should return the same result for the same seed", () => {
      expect(ArrayUtils.shuffle(array, 1)).toEqual(
        ArrayUtils.shuffle(array, 1)
      );
    });

    it("should return different results for a different seed", () => {
      expect(ArrayUtils.shuffle(array, 1)).not.toEqual(
        ArrayUtils.shuffle(array, 2)
      );
    });
  });
});
