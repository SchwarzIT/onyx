import { describe, expect, test } from "vitest";
import { dateToISOString, isValidDate } from "./date.js";

describe("isValidDate", () => {
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

describe("dateToISOString", () => {
  test.each([
    { type: "date", expected: "2025-10-16" },
    { type: "datetime-local", expected: "2025-10-16T11:01" },
    { type: "datetime-utc", expected: "2025-10-16T11:01:00.000Z" },
  ] as const)("should correctly format for type $type with a valid date", ({ type, expected }) => {
    const date = new Date("2025-10-16T11:01Z");
    expect(dateToISOString(date, type)).toBe(expected);
  });

  test.each([
    { type: "date", expected: "0025-10-16" },
    { type: "datetime-local", expected: "0025-10-16T11:01" },
    { type: "datetime-utc", expected: "0025-10-16T11:01:56.200Z" },
  ] as const)(
    "should correctly format for type $type with an awkward date",
    ({ type, expected }) => {
      const date = new Date("0025-10-16T11:01:56.200Z");
      expect(dateToISOString(date, type)).toBe(expected);
    },
  );

  test.each([
    { type: "date", expected: "2025-10-16" },
    { type: "datetime-local", expected: "2025-10-16T09:31" },
    { type: "datetime-utc", expected: "2025-10-16T09:31:56.200Z" },
  ] as const)(
    "should correctly format for type $type with a different timezone date",
    ({ type, expected }) => {
      const date = new Date("2025-10-16T11:01:56.200+01:30");
      expect(process.env.TZ).toBe("UTC"); // globally configured
      expect(dateToISOString(date, type)).toBe(expected);
    },
  );

  test.each([{ type: "date" }, { type: "datetime-local" }, { type: "datetime-utc" }] as const)(
    "should return undefined for type $type with a invalid date",
    ({ type }) => {
      const date = new Date("invalid-date");
      expect(dateToISOString(date, type)).toBeUndefined();
    },
  );
});
