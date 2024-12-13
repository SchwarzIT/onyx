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
      // allow the fixture itself to import from Playwright directly
      if (context.filename.endsWith("/playwright/a11y.ts")) return;

      const hasFixture = ["expect", "test"].includes(node.imported.name);
      if (!hasFixture) return;

      // type check that node.parent.source.value exists
      if (node.parent.type !== "ImportDeclaration" || !node.parent.source.value) {
        return;
      }

      const isDisallowedImport = ["@playwright/test", "@playwright/experimental-ct-vue"].includes(
        node.parent.source.value.toString(),
      );

      if (isDisallowedImport) {
        context.report({
          node,
          loc: node.loc ?? undefined,
          message: `Import "${node.imported.name}" from "../../playwright/a11y" instead because onyx uses custom Playwright fixtures for providing a global configuration for accessibility testing.`,
        });
      }
    },
  }),
};
