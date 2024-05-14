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
        "Prevents using the h method from vue in Storybook files since it leads to bad generated code snippets",
    },
  },
  create: (context) => ({
    ImportSpecifier(node) {
      if (!context.filename.endsWith(".stories.ts")) return;
      if (node.imported.name !== "h") return;

      // type check that node.parent.source.value exists
      if (node.parent.type !== "ImportDeclaration" || !node.parent.source.value) {
        return;
      }
      if (node.parent.source.value.toString() !== "vue") return;

      context.report({
        node,
        loc: node.loc ?? undefined,
        message: `Do not use h method in Storybook files since it leads to bad generated code snippets/documentation.
        Use a render function instead.`,
      });
    },
  }),
};
