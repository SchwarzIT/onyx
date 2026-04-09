import { describe, expect, test } from "vitest";
import { versionCompare } from "./version-compare.js";

describe("versionCompare", () => {
  test.each([
    { a: "1.0.0", b: "2.0.0", result: 1 },
    { a: "1.0.0", b: "1.1.0", result: 1 },
    { a: "1.0.0", b: "1.0.1", result: 1 },
    { a: "1.0.0", b: "1.0.1", result: 1 },
    { a: "1.0.0", b: "1.0.0", result: 0 },
    { a: "1.0.0", b: "1.0.0-abcdef", result: 0 },
    { a: "1.0.0-abcdef", b: "1.0.0", result: 0 },
    { a: "1.0.0", b: "0.9.0", result: -1 },
    { a: "2.0.0", b: "1.0.0", result: -1 },
    { a: "1.1.0", b: "1.0.0", result: -1 },
    { a: "1.0.1", b: "1.0.0", result: -1 },
    { a: "1.0.1", b: "1.0.0", result: -1 },
  ])("should return $result if $b is bigger than $a", ({ a, b, result }) => {
    expect(versionCompare(a, b)).toBe(result);
  });
});
