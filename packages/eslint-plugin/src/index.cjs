// @ts-check
const packageJson = require("../package.json");

module.exports = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  rules: {
    "import-playwright-a11y": require("./rules/import-playwright-a11y.cjs"),
    "storybook-no-h-method": require("./rules/storybook-no-h-method.cjs"),
  },
};
