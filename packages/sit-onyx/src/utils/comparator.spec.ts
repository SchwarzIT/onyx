import { expect, test } from "vitest";
import { areObjectsFlatEqual } from "./comparator";

const referenceObj = { a: 42, b: "foo", c: null, d: true };

test("should return true for objects with the same ordered key-values", () => {
  // ARRANGE
  const compareObj = { a: 42, b: "foo", c: null, d: true };

  // ACT
  const result = areObjectsFlatEqual(referenceObj, compareObj);

  // ASSERT
  expect(result).toBeTruthy();
});

test("should return true for objects with differently ordered key-values", () => {
  // ARRANGE
  const compareObj = { d: true, b: "foo", c: null, a: 42 };

  // ACT
  const result = areObjectsFlatEqual(referenceObj, compareObj);

  // ASSERT
  expect(result).toBeTruthy();
});

test("should return false for objects with different properties", () => {
  // ARRANGE
  const compareObj = { foo: 42 };

  // ACT
  const result = areObjectsFlatEqual(referenceObj, compareObj);

  // ASSERT
  expect(result).toBeFalsy();
});

test("should return false for objects with different number values", () => {
  // ARRANGE
  const compareObj = { ...referenceObj, a: 0 };

  // ACT
  const result = areObjectsFlatEqual(referenceObj, compareObj);

  // ASSERT
  expect(result).toBeFalsy();
});

test("should return false for objects with different string values", () => {
  // ARRANGE
  const compareObj = { ...referenceObj, b: "bar" };

  // ACT
  const result = areObjectsFlatEqual(referenceObj, compareObj);

  // ASSERT
  expect(result).toBeFalsy();
});

test("should return false for objects with different nullish values", () => {
  // ARRANGE
  const compareObj = { ...referenceObj, c: undefined };

  // ACT
  const result = areObjectsFlatEqual(referenceObj, compareObj);

  // ASSERT
  expect(result).toBeFalsy();
});

test("should return false for objects with different boolean values", () => {
  // ARRANGE
  const compareObj = { ...referenceObj, d: false };

  // ACT
  const result = areObjectsFlatEqual(referenceObj, compareObj);

  // ASSERT
  expect(result).toBeFalsy();
});
