/* eslint-env node */

module.exports = {
  root: false, // will be merged with our global config
  extends: ["plugin:playwright/recommended"],
  rules: {
    "no-console": "error",
    "no-debugger": "error",
  },
};
