import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { dateToISOString, isValidDate, nextMonthForDate, previousMonthForDate } from "./date.js";

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

describe("nextMonthForDate", () => {
  test.each([
    { input: new Date(2001, 0, 1), expected: new Date(2001, 1, 1) },
    { input: new Date(2001, 0, 31), expected: new Date(2001, 1, 1) },
    { input: new Date(2001, 11, 31), expected: new Date(2002, 0, 1) },
    { input: new Date(2001, 0, 31, 23, 59, 59), expected: new Date(2001, 1, 1) },
  ])("should determine the date of the following month for $input", ({ input, expected }) => {
    const result = nextMonthForDate(input).getTime();
    expect(result).toBe(expected.getTime());
  });
});

describe("previousMonthForDate", () => {
  test.each([
    { input: new Date(2001, 0, 1), expected: new Date(2000, 11, 1) },
    { input: new Date(2001, 0, 31), expected: new Date(2000, 11, 1) },
    { input: new Date(2001, 0, 31, 23, 59, 59), expected: new Date(2000, 11, 1) },
  ])("should determine the date of the following month for $input", ({ input, expected }) => {
    const result = previousMonthForDate(input).getTime();
    expect(result).toBe(expected.getTime());
  });
});

describe("dateToISOString", () => {
  beforeEach(() => {
    vi.stubEnv("TZ", "UTC");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test.each([
    { type: "date", expected: "2025-10-16" },
    { type: "datetime-local", expected: "2025-10-16T20:00" },
    { type: "datetime-utc", expected: "2025-10-17T04:00:00.000Z" },
  ] as const)(
    "should correctly handle local timezone correctly for type $type",
    ({ type, expected }) => {
      vi.stubEnv("TZ", "Etc/GMT+8");
      const date = new Date("2025-10-17T04:00Z"); // same as "2025-10-16T20:00-08:00" (using the stubbed timezone's offset)
      expect(dateToISOString(date, type)).toBe(expected);
    },
  );

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
