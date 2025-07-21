import { describe, expect, test } from "vitest";
import { MathUtils } from "./math.js";

describe("MathUtils.clamp", () => {
  test.each([
    { number: 1, min: 1, max: 2, result: 1 },
    { number: 1, min: 2, max: 2, result: 2 },
    { number: 1, min: 0, max: 0, result: 0 },
    { number: 1, min: 1, max: 1, result: 1 },
  ])(
    "should return $result for key number:$number min:$min max:$max",
    ({ number, min, max, result }) => expect(MathUtils.clamp(number, min, max)).toBe(result),
  );
});
