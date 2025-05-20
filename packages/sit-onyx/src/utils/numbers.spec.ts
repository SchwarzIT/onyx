import { describe, expect, it } from "vitest";
import {
  applyLimits,
  convertBinaryPrefixToBytes,
  roundToPrecision,
  type BinaryPrefixedSize,
} from "./numbers";

// Tests for applyLimits function
describe("applyLimits", () => {
  it("returns the number if within the limits", () => {
    expect(applyLimits(5, 0, 10)).toBe(5);
    expect(applyLimits(-3, -5, 5)).toBe(-3);
  });

  it("returns the minimum limit if number is below min", () => {
    expect(applyLimits(-10, 0, 10)).toBe(0);
    expect(applyLimits(1, 5, 10)).toBe(5);
  });

  it("returns the maximum limit if number is above max", () => {
    expect(applyLimits(20, 0, 10)).toBe(10);
    expect(applyLimits(15, 0, 10)).toBe(10);
  });

  it("returns the number if no min or max is provided", () => {
    expect(applyLimits(20, undefined, undefined)).toBe(20);
  });

  it("returns the number constrained only by max if min is undefined", () => {
    expect(applyLimits(20, undefined, 15)).toBe(15);
  });

  it("returns the number constrained only by min if max is undefined", () => {
    expect(applyLimits(5, 10, undefined)).toBe(10);
  });
});

// Tests for roundToPrecision function
describe("roundToPrecision", () => {
  it("rounds to specified decimal places when precision is positive", () => {
    expect(roundToPrecision(5.6789, 2)).toBe("5.68");
    expect(roundToPrecision(1.2344, 3)).toBe("1.234");
  });

  it("rounds to specified whole number places when precision is negative", () => {
    expect(roundToPrecision(1234, -1)).toBe("1230");
    expect(roundToPrecision(56789, -2)).toBe("56800");
  });

  it("returns the number as a string without rounding if precision is zero", () => {
    expect(roundToPrecision(1234, 0)).toBe("1234");
  });

  it("returns empty string if value is undefined", () => {
    expect(roundToPrecision(undefined, 2)).toBe("");
  });

  it("rounds zero value when precision is set", () => {
    expect(roundToPrecision(0, 2)).toBe("0.00");
  });
});

describe("convertBinaryPrefixToBytes", () => {
  it.each<{ value: BinaryPrefixedSize; expected: number }>([
    { value: "4.25Ki", expected: 4.25 * 1024 ** 1 },
    { value: "4.25Mi", expected: 4.25 * 1024 ** 2 },
    { value: "4.25Gi", expected: 4.25 * 1024 ** 3 },
    { value: "4.25Ti", expected: 4.25 * 1024 ** 4 },
    { value: "4.25Pi", expected: 4.25 * 1024 ** 5 },
    { value: "4.25Ei", expected: 4.25 * 1024 ** 6 },
    { value: "4.25Zi", expected: 4.25 * 1024 ** 7 },
    { value: "4.25Yi", expected: 4.25 * 1024 ** 8 },
    { value: "4.25Ri", expected: 4.25 * 1024 ** 9 },
    { value: "4.25Qi", expected: 4.25 * 1024 ** 10 },
  ])("should convert binary prefix $value to $expected bytes", ({ value, expected }) => {
    const bytes = convertBinaryPrefixToBytes(value);
    expect(bytes).toBe(expected);
  });
});
