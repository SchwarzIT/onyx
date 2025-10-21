"use strict";

const utils = require("eslint-plugin-vue/lib/utils");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Finds code occurrences, where props are directly passed to a child component. This can be problematic, as excessive props are rendered as attributes and may cause unexpected behavior.",
    },
    fixable: null,
    schema: [
      {
        type: "object",
        properties: {
          ignores: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
            additionalItems: false,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      boundProps: `All props are bound directly using v-bind="{{ name }}", this is usually a mistake! Props which are not defined by the target will be rendered as attributes and have unintended side-effects!`,
    },
  },
  /** @param {import('eslint').Rule.RuleContext} context */
  create(context) {
    const ignores = context.options?.[0]?.ignores;
    if (ignores && new RegExp(ignores).test(context.filename)) {
      return {};
    }

    /**
     * Used to track the names of the defined props objects
     * @type {string[]}
     */
    const propsIdentifiers = ["$props"];

    return utils.compositingVisitors(
      utils.defineScriptSetupVisitor(context, {
        /** @param {import("vue-eslint-parser/ast/nodes").Node} node */
        onDefinePropsEnter(node) {
          while (node.parent != null && node.type !== "VariableDeclaration") {
            node = node.parent;
          }

          if (node == null || node.type !== "VariableDeclaration") {
            return;
          }

          node.declarations.forEach((d) => propsIdentifiers.push(d.id.name));
        },
      }),
      utils.defineTemplateBodyVisitor(context, {
        /** @param {import("vue-eslint-parser/ast/nodes").VAttribute} node */
        "VAttribute[directive=true][key.name.name='bind'][key.argument=null]"(node) {
          const name = node.value?.expression?.name;
          if (!name) {
            return;
          }
          if (propsIdentifiers.includes(name)) {
            context.report({
              loc: node.value.loc,
              node,
              messageId: "boundProps",
              data: { name },
            });
          }
        },
      }),
    );
  },
};
