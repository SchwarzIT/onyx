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

describe("MathUtils.decimalsCount", () => {
  test.each([
    { number: 1.23, result: 2 },
    { number: 10, result: 0 },
    { number: 0, result: 0 },
    { number: 1.0, result: 0 },
    { number: 3.14159, result: 5 },
    { number: 0.1, result: 1 },
    { number: 123.456789, result: 6 },
    { number: -1.23, result: 2 },
    { number: -10, result: 0 },
    { number: 0.0001, result: 4 },
  ])("should return $result decimal places for number: $number", ({ number, result }) =>
    expect(MathUtils.decimalsCount(number)).toBe(result),
  );
});

describe("MathUtils.valueToPercent", () => {
  test.each([
    { value: 0, min: 0, max: 100, result: 0 },
    { value: 50, min: 0, max: 100, result: 50 },
    { value: 100, min: 0, max: 100, result: 100 },
    { value: 25, min: 0, max: 100, result: 25 },
    { value: 75, min: 0, max: 100, result: 75 },
    { value: 5, min: 0, max: 10, result: 50 },
    { value: 7.5, min: 5, max: 10, result: 50 },
    { value: 0, min: -10, max: 10, result: 50 },
    { value: -5, min: -10, max: 10, result: 25 },
    { value: 10, min: -10, max: 10, result: 100 },
    { value: 20, min: 10, max: 30, result: 50 },
  ])(
    "should return $result% for value:$value in range [$min, $max]",
    ({ value, min, max, result }) => expect(MathUtils.valueToPercent(value, min, max)).toBe(result),
  );
});

describe("MathUtils.percentToValue", () => {
  test.each([
    { percent: 0, min: 0, max: 100, result: 0 },
    { percent: 0.5, min: 0, max: 100, result: 50 },
    { percent: 1, min: 0, max: 100, result: 100 },
    { percent: 0.25, min: 0, max: 100, result: 25 },
    { percent: 0.75, min: 0, max: 100, result: 75 },
    { percent: 0.5, min: 0, max: 10, result: 5 },
    { percent: 0.5, min: 5, max: 10, result: 7.5 },
    { percent: 0.5, min: -10, max: 10, result: 0 },
    { percent: 0.25, min: -10, max: 10, result: -5 },
    { percent: 1, min: -10, max: 10, result: 10 },
    { percent: 0.5, min: 10, max: 30, result: 20 },
  ])("should return $result for $percent% in range [$min, $max]", ({ percent, min, max, result }) =>
    expect(MathUtils.percentToValue(percent, min, max)).toBe(result),
  );
});

describe("MathUtils valueToPercent and percentToValue should be inverse operations", () => {
  test.each([
    { value: 25, min: 0, max: 100 },
    { value: 7.5, min: 5, max: 10 },
    { value: 0, min: -10, max: 10 },
    { value: 15, min: 10, max: 30 },
  ])(
    "should convert value:$value to percent and back to same value in range [$min, $max]",
    ({ value, min, max }) => {
      const percent = MathUtils.valueToPercent(value, min, max) / 100;
      const backToValue = MathUtils.percentToValue(percent, min, max);
      expect(backToValue).toBeCloseTo(value, 10);
    },
  );
});
