"use strict";

const { runClassic } = require("eslint-vitest-rule-tester");
const rule = require("../rules/import-playwright-a11y.cjs");

runClassic(
  "no-playwright-imports-when-fixture-available",
  rule,
  {
    valid: [
      {
        code: `
        import { someOtherFunction } from "@playwright/experimental-ct-vue";
      `,
        filename: "some/other/path/to/file.js",
      },
      {
        code: `
        import { expect } from "../../playwright/a11y";
      `,
        filename: "path/to/playwright/a11y.ts",
      },
    ],

    invalid: [
      {
        code: `
        import { test, expect } from "@playwright/test";
      `,
        errors: [
          {
            message:
              'Import "test" from "../../playwright/a11y" instead because onyx uses custom Playwright fixtures for providing a global configuration for accessibility testing.',
          },
          {
            message:
              'Import "expect" from "../../playwright/a11y" instead because onyx uses custom Playwright fixtures for providing a global configuration for accessibility testing.',
          },
        ],
        filename: "path/to/file.js",
      },
      {
        code: `
        import { test, expect } from "@playwright/experimental-ct-vue";
      `,
        errors: [
          {
            message:
              'Import "test" from "../../playwright/a11y" instead because onyx uses custom Playwright fixtures for providing a global configuration for accessibility testing.',
          },
          {
            message:
              'Import "expect" from "../../playwright/a11y" instead because onyx uses custom Playwright fixtures for providing a global configuration for accessibility testing.',
          },
        ],
        filename: "path/to/file.js",
      },
    ],
  },
  {
    rule,
    languageOptions: {
      parser: require("vue-eslint-parser"),
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
);
