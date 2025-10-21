"use strict";

const {
  definePropertyReferenceExtractor,
} = require("eslint-plugin-vue/lib/utils/property-references");
const utils = require("eslint-plugin-vue/lib/utils");
const { ESLintUtils, AST_NODE_TYPES, TSESTree } = require("@typescript-eslint/utils");
const eslintUtils = require("@eslint-community/eslint-utils");
const { ReferenceTracker } = require("@typescript-eslint/utils/ast-utils");
const ts = require("typescript");

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "TODO",
    },
    fixable: null,
    schema: [],
    messages: {
      boundProps: `All props are bound directly using v-bind="{{ name }}", this is usually a mistake! Props which are not defined by the target, will be rendered as attributes and have unintended side-effects!`,
    },
  },
  /** @param {RuleContext} context */
  create(context) {
    /**
     * @type {string[]}
     */
    const propsIdentifiers = ["$props"];

    const services = ESLintUtils.getParserServices(context, false);
    const scriptSetup = utils.getScriptSetupElement(context);

    new eslintUtils.ReferenceTracker(context.getSourceCode().scopeManager.globalScope);

    const extractor = definePropertyReferenceExtractor(context);

    return utils.compositingVisitors(
      utils.defineScriptSetupVisitor(context, {
        ImportDeclaration(node) {
          node;
        },
        /**
         *
         * @param {import("vue-eslint-parser/ast/nodes").ESLintCallExpression} _node
         */
        onDefinePropsEnter(_node) {
          _node.parent.parent.declarations.at(0).id.name;
          /**
           * @type {import("vue-eslint-parser/ast/nodes").Node | undefined}
           */
          let node = _node;

          while (node.parent != null && node.type !== "VariableDeclaration") {
            node = node.parent;
          }

          if (node == null || node.type !== "VariableDeclaration") {
            return;
          }

          node.declarations.forEach((d) => propsIdentifiers.push(d.id.name));
        },
        /**
         * @param {TSESTree.VariableDeclaration} node
         */
        /* ["VariableDeclaration"]: (node) => {
          node.declarations
            .map((d) => ({ declaration: d, type: services.getTypeAtLocation(d) }))
            .filter(
              ({ type }) => {
                if (type.flags & ts.TypeFlags.Any) {
                  return false;
                }
                if (type.flags & (ts.TypeFlags.NonPrimitive | ts.TypeFlags.Object)) {
                  return true;
                }
              },
              /*          (t.flags & ts.TypeFlags.Any) != 1 &&
                (t.symbol.flags & ts.SymbolFlags.ObjectLiteral ||
                  t.flags & (ts.TypeFlags.NonPrimitive | ts.TypeFlags.Object)), */
        /*  )
            .forEach(({ declaration }) => propsIdentifiers.push(declaration.id.name)); */
        /** *}, */
        /* onDefinePropsEnter: (node) => {
          // get name of the declaration
          // node.parent.parent.declarations.at(0).id.name;
          if (node.parent.parent.type === "VariableDeclaration") {
            node.parent.parent.declarations.forEach(({ id }) => propsIdentifiers.push(id.name));
          }
          console.log(propsIdentifiers);console.log(propsIdentifiers);
        }, */
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
