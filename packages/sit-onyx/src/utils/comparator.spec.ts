import { expect, test } from "vitest";
import { areObjectsFlatEqual } from "./comparator";

const referenceObj = { a: 42, b: "foo", c: null, d: true };

test("should return true for equal objects with the same ordered key-values", () => {
  // ARRANGE
  const compareObj = { ...referenceObj };

  // ACT
  const result = areObjectsFlatEqual(referenceObj, compareObj);

  // ASSERT
  expect(result).toBeTruthy();
});

test("should return true for equal objects with differently ordered key-values", () => {
  // ARRANGE
  const compareObj = { d: true, b: "foo", c: null, a: 42 };

  // ACT
  const result = areObjectsFlatEqual(referenceObj, compareObj);

  // ASSERT
  expect(result).toBeTruthy();
});

test("should return true for equal objects ignoring undefined keys", () => {
  // ARRANGE
  const compareObj = { ...referenceObj, e: undefined };

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
])("should return false when objects differentiate by $label", ({ compareObj }) => {
  // ACT
  const result = areObjectsFlatEqual(referenceObj, compareObj);

  // ASSERT
  expect(result).toBeFalsy();
});
