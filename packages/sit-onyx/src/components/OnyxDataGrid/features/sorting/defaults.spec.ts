import { expect, test } from "vitest";
import { DEFAULT_COMPARES, TIME_COMPARE } from "./defaults.js";

const OLDER_DATE = new Date(2021, 11, 31);
const NEWER_DATE = new Date(2022, 0, 1);

test.for([
  { type: "string", a: "a", b: "a", expected: 0 },
  { type: "string", a: "a", b: "b", expected: -1 },
  { type: "string", a: "b", b: "a", expected: 1 },
  { type: "string", a: "1", b: "a", expected: -1 },
  { type: "number", a: 1, b: 1, expected: 0 },
  { type: "number", a: 1, b: 2, expected: -1 },
  { type: "number", a: 2, b: 1, expected: 1 },
  { type: "skeleton", a: undefined, b: undefined, expected: 0 },
  { type: "skeleton", a: 1, b: 2, expected: 0 },
] as const)("should compare correctly for type $type", ({ type, a, b, expected }) => {
  const collator = new Intl.Collator("de-DE");
  const result = DEFAULT_COMPARES[type](a, b, collator);
  expect(result).toBe(expected);
});

test.for(["datetime-local", "timestamp", "date"] as const)(
  "should compare dates correctly for type $0",
  (type) => {
    const collator = new Intl.Collator("de-DE");
    expect(DEFAULT_COMPARES[type](NEWER_DATE, OLDER_DATE, collator)).toBeGreaterThanOrEqual(1);
    expect(DEFAULT_COMPARES[type](OLDER_DATE, NEWER_DATE, collator)).toBeLessThanOrEqual(-1);
    expect(DEFAULT_COMPARES[type](OLDER_DATE, new Date(OLDER_DATE), collator)).toBe(0);
  },
);

test.for([
  { a: new Date(2020, 0, 1, 12, 34, 56, 78), b: new Date(2020, 0, 1, 12, 34, 56, 78), expected: 0 },
  { a: new Date(2019, 0, 1, 12, 34, 56, 78), b: new Date(2020, 0, 1, 12, 34, 56, 78), expected: 0 },
  { a: new Date(2019, 0, 1, 12, 34, 56, 78), b: new Date(2020, 0, 1, 12, 34, 56, 0), expected: 1 },
  { a: new Date(2019, 0, 1, 12, 34, 56, 0), b: new Date(2020, 0, 1, 12, 34, 56, 78), expected: -1 },
])("should compare times correctly for $a and $b", ({ a, b, expected }) => {
  const collator = new Intl.Collator("de-DE");
  expect(Math.sign(TIME_COMPARE(a, b, collator))).toBeCloseTo(expected);
  expect(Math.sign(TIME_COMPARE(b, a, collator) * -1)).toBeCloseTo(expected);
});
