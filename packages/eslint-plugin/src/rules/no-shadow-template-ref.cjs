/**
 * @author Jonathan Carle
 * See LICENSE file in root directory for full license.
 */
"use strict";

/**
 * @typedef {import('eslint').Rule.RuleContext} RuleContext
 * @typedef {import('@eslint/core').RuleDefinition} RuleDefinition
 */

const utils = require("eslint-plugin-vue/lib/utils");

/**
 * @type {RuleDefinition}
 */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow the use of template ref names that cause runtime console warnings",
      categories: undefined,
      url: "https://github.com/vuejs/core/issues/12852",
    },
    fixable: null,
    schema: [],
    messages: {
      violation:
        "Use a different name to avoid Vue runtime warnings about failing set operations on readonly target. See https://github.com/vuejs/core/issues/12852.",
    },
  },
  create(context) {
    return {
      CallExpression(callExpression) {
        const firstArgument = callExpression.arguments[0];
        const name =
          firstArgument && utils.isStringLiteral(firstArgument)
            ? utils.getStringLiteralValue(firstArgument)
            : undefined;
        const assignmentName = callExpression.parent.id?.name;
        if (
          callExpression.callee.type !== "Identifier" ||
          callExpression.callee.name !== "useTemplateRef" ||
          !name ||
          name !== assignmentName
        ) {
          return;
        }

        context.report({
          loc: callExpression.loc,
          messageId: "violation",
        });
      },
    };
  },
};
