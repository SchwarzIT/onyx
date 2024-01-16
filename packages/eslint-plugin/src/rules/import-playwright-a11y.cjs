// @ts-check

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      recommended: true,
      description:
        "Prevents importing test and except from Playwright when a custom fixture is available",
    },
  },
  create: (context) => ({
    ImportSpecifier(node) {
      const hasFixture = ["expect", "test"].includes(node.imported.name);
      if (!hasFixture) return;

      if (
        "source" in node.parent &&
        "value" in node.parent.source &&
        node.parent.source.value === "@playwright/test"
      ) {
        context.report({
          node,
          loc: node.loc,
          message: `Import "${node.imported.name}" from "../../playwright-axe" instead because Onyx uses custom Playwright fixtures for providing a global configuration for accessability testing.`,
        });
      }
    },
  }),
};
