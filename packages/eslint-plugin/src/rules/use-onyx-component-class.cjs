// @ts-check

const utils = require("eslint-plugin-vue/lib/utils");

/**
 * @param {import('vue-eslint-parser').AST.VElement} node
 */
const flattenAttributes = (node) =>
  node.startTag.attributes.map((a) => {
    if (a.key.type !== "VDirectiveKey") {
      return;
    }
    if (a.value?.type === "VLiteral") {
      return [a.value];
    }
    if (
      a.value?.type === "VExpressionContainer" &&
      a.value.expression?.type === "ObjectExpression"
    ) {
      a.value.expression.properties.filter((e) => e.type === "Property");
    }
  });

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
  create: (context) =>
    context.parserServices.defineTemplateBodyVisitor(
      // Event handlers for <template>.
      {
        /**
         * @param {import('vue-eslint-parser').AST.VElement} node
         */
        VElement(node) {
          utils.defineTemplateBodyVisitor(context);
          if (node.name !== "template") {
            return;
          }
          debugger;
          node.children.filter(
            (rootChild) =>
              rootChild.type === "VElement" &&
              rootChild.startTag.attributes.some(
                (a) =>
                  a.key.type === "VDirectiveKey" &&
                  a.key.argument?.type === "VIdentifier" &&
                  a.key.argument.name === "class" &&
                  a.value?.type === "VLiteral" &&
                  a.value.value.includes("onyx-c"),
              ),
          );
        },
      },
    ),
};
