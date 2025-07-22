import { expect, test } from "vitest";
import { isSubsetMatching } from "./object.js";

const referenceObj = { a: 42, b: "foo", c: null, d: true };

test.each([
  // ARRANGE
  { label: "with the same key-values", compareObj: { ...referenceObj } },
  {
    label: "with additional key-values in compared object",
    compareObj: { d: true, b: "foo", c: null, a: 42, f: 23 },
  },
  { label: "with undefined keys", compareObj: { ...referenceObj, e: undefined } },
])("should return true for objects $label", ({ compareObj }) => {
  // ACT
  const result = isSubsetMatching(referenceObj, compareObj);

  // ASSERT
  expect(result).toBeTruthy();
});

test.each([
  // ARRANGE
  { label: "only having a single entry", compareObj: { foo: 42 } },
  { label: "a value", compareObj: { ...referenceObj, a: 0 } },
  { label: "a value", compareObj: { ...referenceObj, a: undefined } },
])("should return false when objects differ by $label", ({ compareObj }) => {
  // ACT
  const result = isSubsetMatching(referenceObj, compareObj);

  // ASSERT
  expect(result).toBeFalsy();
});
