import { expect, test } from "vitest";
import { normalizedIncludes, normalizeUrlHash } from "./strings";

test.each([
  // ARRANGE
  { haystack: "", needle: "", expected: true },
  { haystack: "", needle: " ", expected: false },
  { haystack: " ", needle: "", expected: true },
  { haystack: "ASM", needle: "A", expected: true },
  { haystack: "ASM", needle: "x", expected: false },
  { haystack: "üben", needle: "ü", expected: true },
  { haystack: "üben", needle: "u", expected: true },
  { haystack: "uber", needle: "ü", expected: true },
  { haystack: "uBeR", needle: "uber", expected: true },
  { haystack: "uBeR", needle: "ÜBer", expected: true },
  { haystack: "äü🎉ö", needle: "🎉", expected: true },
  { haystack: "ÜBen", needle: "übEn", expected: true },
  { haystack: "ÜBen", needle: "üBen", expected: true },
])(
  "should return $expected when $needle is searched in $haystack",
  ({ haystack, needle, expected }) => {
    // ACT
    const result = normalizedIncludes(haystack, needle);

    // ASSERT
    expect(result).toBe(expected);
  },
);

test.each([
  // ARRANGE
  { text: "Hello World", expected: "hello-world" },
  { text: "   Hello World   ", expected: "hello-world" },
  { text: "hello-world", expected: "hello-world" },
])("should transform $text to $expected when normalizing as hash", ({ text, expected }) => {
  // ACT
  const result = normalizeUrlHash(text);

  // ASSERT
  expect(result).toBe(expected);
});
