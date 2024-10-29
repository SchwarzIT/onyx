import { describe, expect, it } from "vitest";
import { applyLimits, isDivisible, roundToPrecision } from "./numbers";

// Tests for isDivisible function
describe("isDivisible", () => {
  it("returns true if number is divisible by precision", () => {
    expect(isDivisible(10, 2)).toBe(true);
    expect(isDivisible(15, 5)).toBe(true);
    expect(isDivisible(0.4, 0.2)).toBe(true);
  });

  it("returns false if number is not divisible by precision", () => {
    expect(isDivisible(10, 3)).toBe(false);
    expect(isDivisible(15, 4)).toBe(false);
    expect(isDivisible(0.5, 0.3)).toBe(false);
  });

  it("returns true if number is 0 and precision is non-zero", () => {
    expect(isDivisible(0, 1)).toBe(true);
    expect(isDivisible(0, 0.1)).toBe(true);
  });

  it("returns false if precision is 0 (division by zero)", () => {
    expect(isDivisible(10, 0)).toBe(false);
  });
});

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
});