/* eslint-env node */

module.exports = {
  root: false, // will be merged with our global config
  extends: ["plugin:playwright/recommended"],
  plugins: ["@sit-onyx", "vue-scoped-css"],
  rules: {
    "no-console": "error",
    "no-debugger": "error",
    "vue/html-button-has-type": "error",
    "@sit-onyx/import-playwright-a11y": "error",
    // disallow scoped or module CSS for components
    // see https://github.com/SchwarzIT/onyx/wiki/Technical-Vision-&-Guidelines#css
    "vue-scoped-css/enforce-style-type": ["error", { allows: ["plain"] }],
    // we want to provide the flexibility to have the autofocus property.
    // whe JSDoc description includes a warning that it should be used carefully.
    "vuejs-accessibility/no-autofocus": "off",
  },
  overrides: [
    // disable playwright rules for vitest (unit test) files
    {
      files: ["src/**/*.spec.ts"],
      rules: { "playwright/no-standalone-expect": "off" },
    },
  ],
};
