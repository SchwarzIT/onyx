import { ParsedVariable } from "src/index.js";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { generateAsCSS, generateAsSCSS } from "./generate.js";

describe("generate.ts", () => {
  const mockData = {
    modeName: "test-mode-1",
    variables: {
      "test-1": "#ffffff",
      "test-2": "1rem",
      "test-3": "{test-2}",
    },
  } satisfies ParsedVariable;

  beforeEach(() => {
    vi.setSystemTime(new Date(2024, 0, 7, 13, 42));
  });

  test("should generate as CSS", () => {
    const fileContent = generateAsCSS(mockData);

    // due to issue between macOS and linux, we can not directly compare the whole
    // string because this would fail in CI, so we check for each line individually
    // we must also remove new lines at the start of each line
    const expectedLines = [
      "/**",
      "* Do not edit directly.",
      '* This file contains the specific variables for the "test-mode-1" theme.',
      "* Imported from Figma API on Sun, 07 Jan 2024 12:42:00 GMT",
      "*/",
      ":root {",
      "--test-1: #ffffff;",
      "--test-2: 1rem;",
      "--test-3: var(--test-2);",
      "}",
    ];

    expectedLines.forEach((line) => expect(fileContent.includes(line)).toBe(true));
  });

  test("should generate as CSS with custom selector", () => {
    const fileContent = generateAsCSS(mockData, "html");

    const expectedLines = [
      "/**",
      "* Do not edit directly.",
      '* This file contains the specific variables for the "test-mode-1" theme.',
      "* Imported from Figma API on Sun, 07 Jan 2024 12:42:00 GMT",
      "*/",
      "html.test-mode-1 {",
      "--test-1: #ffffff;",
      "--test-2: 1rem;",
      "--test-3: var(--test-2);",
      "}",
    ];

    expectedLines.forEach((line) => expect(fileContent.includes(line)).toBe(true));
  });

  test("should generate as SCSS", () => {
    const fileContent = generateAsSCSS(mockData);

    const expectedLines = [
      "/**",
      "* Do not edit directly.",
      '* This file contains the specific variables for the "test-mode-1" theme.',
      "* Imported from Figma API on Sun, 07 Jan 2024 12:42:00 GMT",
      "*/",
      "$test-1: #ffffff;",
      "$test-2: 1rem;",
      "$test-3: $test-2;",
    ];

    expectedLines.forEach((line) => expect(fileContent.includes(line)).toBe(true));
  });
});
