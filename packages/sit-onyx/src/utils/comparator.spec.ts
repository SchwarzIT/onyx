import { expect, test } from "vitest";
import { areObjectsFlatEqual } from "./comparator";

const obj1 = { a: 42, b: "foo", c: null };

test("should return false for objects with different properties", () => {
  const obj2 = { foo: 42 };

  const result = areObjectsFlatEqual(obj1, obj2);

  expect(result).toBeFalsy();
});
test("should return false for objects with different values", () => {
  const obj2 = { a: 42, b: "bar", c: null };

  const result = areObjectsFlatEqual(obj1, obj2);

  expect(result).toBeFalsy();
});

test("should return true for objects with the same ordered key-values", () => {
  const obj2 = { a: 42, b: "foo", c: null };

  const result = areObjectsFlatEqual(obj1, obj2);

  expect(result).toBeTruthy();
});

test("should return true for objects with differently ordered key-values", () => {
  const obj2 = { b: "foo", c: null, a: 42 };

  const result = areObjectsFlatEqual(obj1, obj2);

  expect(result).toBeTruthy();
});
