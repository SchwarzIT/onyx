import { describe, expect, test } from "vitest";
import { isValidDate } from "./date.js";

describe("date", () => {
  test.each([
    { input: "", isValid: false },
    { input: 0, isValid: false },
    { input: false, isValid: false },
    { input: undefined, isValid: false },
    { input: null, isValid: false },
    { input: "not-a-date", isValid: false },
    { input: new Date("not-a-date"), isValid: false },
    { input: new Date(), isValid: true },
  ])("should determine correctly if $input is a valid date", ({ input, isValid }) => {
    expect(isValidDate(input)).toBe(isValid);
  });
});
