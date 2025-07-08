// @ts-check
const packageJson = require("../package.json");

/**
 * @type {import("eslint").ESLint.Plugin}
 */
module.exports = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  rules: {
    "import-playwright-a11y": require("./rules/import-playwright-a11y.cjs"),
    "no-shadow-native": require("./rules/no-shadow-native-events.cjs"),
    "no-shadow-template-ref": require("./rules/no-shadow-template-ref.cjs"),
    "no-esm-incompatible-imports": require("./rules/no-esm-incompatible-imports.cjs"),
    "require-root-class": require("./rules/require-root-class.cjs"),
  },
};
