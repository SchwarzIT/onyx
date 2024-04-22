// @ts-check
import playwright from "eslint-plugin-playwright";
import eslintPluginVueScopedCSS from "eslint-plugin-vue-scoped-css";
import baseConfig from "../../eslint.config";

export default [
  ...baseConfig,
  ...eslintPluginVueScopedCSS.configs["flat/recommended"],
  {
    ...playwright.configs["flat/recommended"],
    files: ["**/*.tsx"],
  },
  {
    rules: {
      "playwright/expect-expect": "off",
      "no-console": "error",
      "no-debugger": "error",
    },
  },
];
