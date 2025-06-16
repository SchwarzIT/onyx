import { describe, expect, test } from "vitest";
import { allObjectEntries, areObjectsFlatEqual, asArray, groupByKey } from "./objects";

const referenceObj = { a: 42, b: "foo", c: null, d: true };

describe("areObjectsFlatEqual", () => {
  test.each([
    // ARRANGE
    { label: "with the same ordered key-values", compareObj: { ...referenceObj } },
    {
      label: "with differently ordered key-values",
      compareObj: { d: true, b: "foo", c: null, a: 42 },
    },
    { label: "ignoring undefined keys", compareObj: { ...referenceObj, e: undefined } },
  ])("should return true for equal objects $label", ({ compareObj }) => {
    // ACT
    const result = areObjectsFlatEqual(referenceObj, compareObj);

    // ASSERT
    expect(result).toBeTruthy();
  });

  test.each([
    // ARRANGE
    { label: "the existing properties", compareObj: { foo: 42 } },
    { label: "the value of a number property", compareObj: { ...referenceObj, a: 0 } },
    { label: "the value of a string property", compareObj: { ...referenceObj, b: "bar" } },
    { label: "the value of a nullish property", compareObj: { ...referenceObj, c: undefined } },
    { label: "the value of a boolean property", compareObj: { ...referenceObj, d: false } },
  ])("should return false when objects differ by $label", ({ compareObj }) => {
    // ACT
    const result = areObjectsFlatEqual(referenceObj, compareObj);

    // ASSERT
    expect(result).toBeFalsy();
  });
});

describe("groupByKey", () => {
  test("should group by key", () => {
    // ARRANGE
    const input = [{ a: 1, group: "a" }, { a: 2, group: "a" }, { a: 3, group: "b" }, { a: 4 }];
    const output = {
      a: [
        { a: 1, group: "a" },
        { a: 2, group: "a" },
      ],
      b: [{ a: 3, group: "b" }],
      "": [{ a: 4 }],
    };
    // ACT
    const result = groupByKey(input, "group");

    // ASSERT
    expect(result).toMatchObject(output);
  });
});

describe("allObjectEntries", () => {
  const TEST_SYMBOL = Symbol();

  test.each([
    // ARRANGE
    { label: "empty object", target: {}, expected: [] },
    { label: "object with one property", target: { a: 1 }, expected: [["a", 1]] },
    {
      label: "object with multiple properties",
      target: { a: 1, b: "foo", c: null },
      expected: [
        ["a", 1],
        ["b", "foo"],
        ["c", null],
      ],
    },
    {
      label: "object with nested objects",
      target: { a: { x: 1 }, b: { y: "foo" } },
      expected: [
        ["a", { x: 1 }],
        ["b", { y: "foo" }],
      ],
    },
    {
      label: "object with nested arrays",
      target: { a: [1, 2, 3], b: ["foo", "bar"] },
      expected: [
        ["a", [1, 2, 3]],
        ["b", ["foo", "bar"]],
      ],
    },
    {
      label: "object with symbol entries",
      target: { [TEST_SYMBOL]: "a" },
      expected: [[TEST_SYMBOL, "a"]],
    },
    {
      label: "object with number entries",
      target: { 1: "a" },
      expected: [["1", "a"]],
    },
  ])("should return correct entries for $label", ({ target, expected }) => {
    // ACT
    const result = allObjectEntries(target);

    // ASSERT
    expect(result).toMatchObject(expected);
  });

  test("should not copy and keep references", () => {
    // ACT
    const [result] = allObjectEntries({ a: referenceObj });

    // ASSERT
    expect(result).toMatchObject(["a", referenceObj]);
    expect(result[1]).toBe(referenceObj);
  });
});

describe("asArray", () => {
  test.each([
    // ARRANGE
    {
      title: "should return empty array for null input",
      input: null,
      expected: [],
      keepNullish: false,
    },
    {
      title: "should return empty array for undefined input",
      input: undefined,
      expected: [],
      keepNullish: false,
    },

    {
      title: "should return array with null when nullish should be kept",
      input: null,
      expected: [null],
      keepNullish: true,
    },
    {
      title: "should return array with undefined when nullish should be kept",
      input: undefined,
      expected: [undefined],
      keepNullish: true,
    },

    {
      title: "should return array with single element for single value input",
      input: 42,
      expected: [42],
      keepNullish: false,
    },
    {
      title: "should return array with single element for array input",
      input: [42],
      expected: [42],
      keepNullish: false,
    },
  ])("$title", ({ input, expected, keepNullish }) => {
    // ACT
    const result = asArray(input, keepNullish);

    // ASSERT
    expect(result).toMatchObject(expected);
  });
});
