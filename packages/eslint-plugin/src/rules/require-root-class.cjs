"use strict";

/**
 * Check whether the given start tag has specific directive.
 * @param {VElement} node The start tag node to check.
 * @param {string} name The directive name to check.
 * @param {string} [argument] The directive argument to check.
 * @returns {boolean} `true` if the start tag has the directive.
 */
function hasDirective(node, name, argument) {
  return Boolean(getDirective(node, name, argument));
}

/**
 * Get the directive which has the given name.
 * @param {VElement} node The start tag node to check.
 * @param {string} name The directive name to check.
 * @param {string} [argument] The directive argument to check.
 * @returns {VDirective | null} The found directive.
 */
function getDirective(node, name, argument) {
  return (
    node.startTag.attributes.find(
      /**
       * @param {VAttribute | VDirective} node
       * @returns {node is VDirective}
       */
      (node) =>
        node.directive &&
        node.key.name.name === name &&
        (argument === undefined ||
          (node.key.argument &&
            node.key.argument.type === "VIdentifier" &&
            node.key.argument.name) === argument),
    ) || null
  );
}

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow adding root nodes to the template",
    },
    fixable: null,
    schema: [],
    messages: {
      multipleRoot: "The template root requires exactly one element.",
      textRoot: "The template root requires an element rather than texts.",
      disallowedElement: "The template root disallows '<{{name}}>' elements.",
      disallowedDirective: "The template root disallows 'v-for' directives.",
    },
  },
  /**
   * @param {RuleContext} context - The rule context.
   * @returns {RuleListener} AST event handlers.
   */
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      Program(program) {
        const element = program.templateBody;
        if (element == null) {
          return;
        }

        const rootElements = [];
        let extraElement = null;
        let vIf = false;
        for (const child of element.children) {
          if (child.type === "VElement") {
            if (rootElements.length === 0) {
              rootElements.push(child);
              vIf = hasDirective(child, "if");
            } else if (vIf && hasDirective(child, "else-if")) {
              rootElements.push(child);
            } else if (vIf && hasDirective(child, "else")) {
              rootElements.push(child);
              vIf = false;
            } else {
              extraElement = child;
            }
          } else if (sourceCode.getText(child).trim() !== "") {
            return;
          }
        }

        if (extraElement == null) {
          for (const element of rootElements) {
            const tag = element.startTag;
            const name = element.name;

            if (name === "template" || name === "slot") {
              return;
            }
            if (element.name.startsWith("onyx")) {
              return true;
            }
            // Check for existence of base class
            /**
             * @type {VIdentifier, VDirectiveKey}
             */
            const has = element.startTag.attributes.some(({ key, value }) => {
              const isClassAttribute =
                (key.type === "VIdentifier" && key.name === "class") ||
                (key.type === "VDirectiveKey" &&
                  key.argument?.type === "VIdentifier" &&
                  key.argument.name === "class");
              if (!isClassAttribute) return false;

              // static class: class="..."
              if (value?.value) {
                return value.value.includes("onyx-component");
              }

              // dynamic class: :class="..."
              if (value?.expression) {
                const expression = value.expression;

                if (expression.type === "ArrayExpression") {
                  // :class="['class1', 'onyx-component']"
                  return expression.elements.some(
                    (element) => element.type === "Literal" && element.value === "onyx-component",
                  );
                } else if (expression.type === "ObjectExpression") {
                  // :class="{ 'onyx-component': true, 'class2': false }"
                  return expression.properties.some((property) => {
                    if (property.type === "SpreadElement") {
                      return false;
                    }
                    return (
                      property.key.type === "Literal" &&
                      property.key.value === "onyx-component" &&
                      property.value.type === "Literal" &&
                      Boolean(property.value.value) === true
                    );
                  });
                } else if (expression.type === "Literal") {
                  // :class="'onyx-component'"
                  return expression.value === "onyx-component";
                }
              }

              return false;
            });

            if (!has) {
              context.report({
                node: tag,
                loc: tag.loc,
                message: "missing class",
              });
            }
            if (hasDirective(element, "for")) {
              context.report({
                node: tag,
                loc: tag.loc,
                messageId: "disallowedDirective",
              });
            }
          }
        } else {
          context.report({
            node: extraElement,
            loc: extraElement.loc,
            messageId: "multipleRoot",
          });
        }
      },
    };
  },
};
