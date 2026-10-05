import { describe, expect, test } from "vitest";
import { stringSplice } from "./string.js";

describe("stringSplice", () => {
  test.each([
    {
      description: "should delete range when replacement is undefined",
      string: "Hello World",
      start: 5,
      end: 11,
      replacement: undefined,
      expected: "Hello",
    },
    {
      description: "should delete range when replacement is empty string",
      string: "Hello World",
      start: 5,
      end: 11,
      replacement: "",
      expected: "Hello",
    },
    {
      description: "should replace substring in the middle",
      string: "Hello World",
      start: 6,
      end: 11,
      replacement: "Universe",
      expected: "Hello Universe",
    },
    {
      description: "should replace substring at the start",
      string: "Hello World",
      start: 0,
      end: 5,
      replacement: "Hi",
      expected: "Hi World",
    },
    {
      description: "should replace substring at the end",
      string: "Hello World",
      start: 6,
      end: 11,
      replacement: "there",
      expected: "Hello there",
    },
    {
      description: "should insert substring without deleting when start equals end",
      string: "Hello World",
      start: 5,
      end: 5,
      replacement: " Beautiful",
      expected: "Hello Beautiful World",
    },
    {
      description: "should insert at the beginning when start and end are 0",
      string: "World",
      start: 0,
      end: 0,
      replacement: "Hello ",
      expected: "Hello World",
    },
    {
      description: "should insert at the end when start and end equal string length",
      string: "Hello",
      start: 5,
      end: 5,
      replacement: " World",
      expected: "Hello World",
    },
    {
      description: "should replace entire string",
      string: "Hello World",
      start: 0,
      end: 11,
      replacement: "Replaced",
      expected: "Replaced",
    },
    {
      description: "should empty entire string when replacement is omitted",
      string: "Hello World",
      start: 0,
      end: 11,
      replacement: undefined,
      expected: "",
    },
    {
      description: "should handle empty string insertion",
      string: "",
      start: 0,
      end: 0,
      replacement: "hello",
      expected: "hello",
    },
    {
      description: "should handle empty string with no replacement",
      string: "",
      start: 0,
      end: 0,
      replacement: undefined,
      expected: "",
    },
    {
      description: "should support negative start index",
      string: "Hello World",
      start: -5,
      end: 11,
      replacement: "Everyone",
      expected: "Hello Everyone",
    },
    {
      description: "should support negative end index",
      string: "Hello World",
      start: 6,
      end: -1,
      replacement: "ony",
      expected: "Hello onyd",
    },
  ])("$description", ({ string, start, end, replacement, expected }) => {
    // ACT
    const result = stringSplice(string, start, end, replacement);

    // ASSERT
    expect(result).toBe(expected);
  });
});
