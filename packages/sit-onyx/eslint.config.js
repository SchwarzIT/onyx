// @ts-check
import playwright from "eslint-plugin-playwright";
import eslintPluginVueScopedCSS from "eslint-plugin-vue-scoped-css";
import baseConfig from "../../eslint.config";

export default [
  ...baseConfig,
  ...eslintPluginVueScopedCSS.configs["flat/recommended"],
  // TODO: add @sit-onyx/eslint-plugin
  {
    ...playwright.configs["flat/recommended"],
    files: ["**/*.tsx"],
  },
  {
    rules: {
      "no-console": "error",
      "no-debugger": "error",
      "@sit-onyx/import-playwright-a11y": "error",
      // disallow scoped or module CSS for components
      // see https://github.com/SchwarzIT/onyx/wiki/Technical-Vision-&-Guidelines#css
      "vue-scoped-css/enforce-style-type": ["error", { allows: ["plain"] }],
    },
  },
];
