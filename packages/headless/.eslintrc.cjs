/* eslint-env node */

/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  root: false, // will be merged with our global config
  extends: ["plugin:playwright/recommended"],
  rules: {
    "playwright/expect-expect": "off",
    "no-console": "error",
    "no-debugger": "error",
  },
  overrides: [
    // disable playwright rules for vitest (unit test) files
    {
      files: ["**/*.spec.ts"],
      rules: { "playwright/no-standalone-expect": "off" },
    },
  ],
};
