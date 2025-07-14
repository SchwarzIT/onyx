import { expect, test } from "vitest";
import { DEFAULT_COMPARES } from "./defaults.js";

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

test.for(["date", "datetime-local", "time", "timestamp"] as const)(
  "should compare dates correctly for type $0",
  (type) => {
    const collator = new Intl.Collator("de-DE");
    expect(DEFAULT_COMPARES[type](NEWER_DATE, OLDER_DATE, collator)).toBeGreaterThanOrEqual(1);
    expect(DEFAULT_COMPARES[type](OLDER_DATE, NEWER_DATE, collator)).toBeLessThanOrEqual(-1);
    expect(DEFAULT_COMPARES[type](OLDER_DATE, new Date(OLDER_DATE), collator)).toBe(0);
  },
);
