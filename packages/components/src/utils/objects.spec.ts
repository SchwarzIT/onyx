import { describe, expect, test } from "vitest";
import { areObjectsFlatEqual, groupByKey } from "./objects";

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
