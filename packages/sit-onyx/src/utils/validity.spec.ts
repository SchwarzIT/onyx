import { expect, test } from "vitest";
import { getFirstInvalidType } from "./validity.js";

const getTestState = (overrideData: Partial<ValidityState>): ValidityState => ({
  valid: false,
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
  ...overrideData,
});

test("should return nothing when there is no invalid state", () => {
  // ARRANGE
  const testState = getTestState({ valid: true });
  // ACT
  const result = getFirstInvalidType(testState);
  // ASSERT
  expect(result).toBeUndefined();
});

test("should prioritize valueMissing over other invalid types", () => {
  // ARRANGE
  const testState = getTestState({ badInput: true, valueMissing: true });
  // ACT
  const result = getFirstInvalidType(testState);
  // ASSERT
  expect(result).toBe("valueMissing");
});

test("should return the name of the invalid state if only one is active", () => {
  // ARRANGE
  const testState = getTestState({ tooShort: true });
  // ACT
  const result = getFirstInvalidType(testState);
  // ASSERT
  expect(result).toBe("tooShort");
});

test("should return the name of the invalid state that appears first alphabetically if multiple are active", () => {
  // ARRANGE
  const testState = getTestState({ typeMismatch: true, tooShort: true, badInput: true });
  // ACT
  const result = getFirstInvalidType(testState);
  // ASSERT
  expect(result).toBe("badInput");
});
