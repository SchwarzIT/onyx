/* eslint-env node */

module.exports = {
  root: false, // will be merged with our global config
  extends: ["plugin:playwright/recommended"],
  plugins: ["@sit-onyx", "vue-scoped-css"],
  rules: {
    "no-console": "error",
    "no-debugger": "error",
    "@sit-onyx/import-playwright-a11y": "error",
    // disallow scoped or module CSS for components
    // see https://github.com/SchwarzIT/onyx/wiki/Technical-Vision-&-Guidelines#css
    "vue-scoped-css/enforce-style-type": ["error", { allows: ["plain"] }],
  },
  overrides: [
    // disable playwright rules for vitest (unit test) files
    {
      files: ["src/**/*.spec.ts"],
      rules: { "playwright/no-standalone-expect": "off" },
    },
    {
      files: ["src/components/**/stories/*.vue"],
      rules: { "vue/multi-word-component-names": "off" },
    },
  ],
};
