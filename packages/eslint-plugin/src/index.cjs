// @ts-check
const packageJson = require("../package.json");

module.exports = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  rules: {
    "import-playwright-a11y": require("./rules/import-playwright-a11y.cjs"),
    "use-onyx-component-class": require("./rules/use-onyx-component-class.cjs"),
  },
};
