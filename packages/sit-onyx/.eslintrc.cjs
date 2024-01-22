/* eslint-env node */

module.exports = {
  root: false, // will be merged with our global config
  extends: ["plugin:playwright/recommended"],
  plugins: ["@sit-onyx"],
  rules: {
    "no-console": "error",
    "no-debugger": "error",
    "@sit-onyx/import-playwright-a11y": "error",
  },
};
