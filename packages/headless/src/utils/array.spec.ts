import { describe, expect, test } from "vitest";
import { areArraysEqual } from "./array.js";

describe("areArraysEqual", () => {
  test("should return true for identical arrays", () => {
    expect(areArraysEqual([], [])).toBe(true);
    expect(areArraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(areArraysEqual(["a", "b"], ["a", "b"])).toBe(true);
  });

  test("should return false for different arrays", () => {
    expect(areArraysEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(areArraysEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(areArraysEqual([1, 2, 3], [3, 2, 1])).toBe(false);
  });

  test("should handle null and undefined", () => {
    expect(areArraysEqual([null], [null])).toBe(true);
    expect(areArraysEqual([undefined], [undefined])).toBe(true);
    expect(areArraysEqual([null], [undefined])).toBe(false);
  });

  test("should use custom comparer for objects", () => {
    const arrayA = [{ id: 1 }, { id: 2 }];
    const arrayB = [{ id: 1 }, { id: 2 }];
    const comparer = (a: { id: number }, b: { id: number }) => a.id === b.id;

    expect(areArraysEqual(arrayA, arrayB)).toBe(false);
    expect(areArraysEqual(arrayA, arrayB, comparer)).toBe(true);
  });
});
