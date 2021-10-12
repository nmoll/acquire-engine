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
          8,
          9,
          4,
          3,
          2,
          6,
          10,
          5,
          1,
          7,
        ]
      `);

      expect(ArrayUtils.shuffle(array, 5)).toMatchInlineSnapshot(`
        Array [
          6,
          4,
          8,
          9,
          3,
          1,
          5,
          2,
          10,
          7,
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
