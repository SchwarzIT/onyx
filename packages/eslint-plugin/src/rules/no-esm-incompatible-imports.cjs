// @ts-check

/**
 * @typedef {object} ASTNode
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import("eslint-plugin-vue/lib/utils").RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    fixable: true,
    docs: {
      description: "Disallow esm incompatible imports.",
      recommended: true,
    },
    messages: {
      incorrectExtension: `Module specifiers are not transformed and therefore the specifier of the output file has to be used. Use '.{{newExtension}}' instead of '.{{extension}}'.`,
      missingFile: `The ESM loader does no extension searching. Add 'index.js' to the import statement.`,
      missingExtension: `The ESM loader does no extension searching. A file extension must be provided when the specifier is a relative or absolute file URL. Add '.js' to the import statement.`,
    },
  },

  create(context) {
    /**
     * Checks a node to see if any problems should be reported.
     * @param {ASTNode} node The node to check.
     * @returns {void}
     * @private
     */
    function checkNode(node) {
      if (/.*\.d\.(\w+\.)?tsx?$/.test(context.filename)) {
        // ignore definition files: example.d.ts, index.d.vue.ts, index.d.tsx etc.
        return;
      }

      /**
       * @type {string}
       */
      const importSource = node.source.value.trim();

      if (/\.tsx?$/.test(importSource)) {
        const extension = importSource.split(".").at(-1) ?? "ts";
        const newExtension = extension?.replace("t", "j") ?? "js";

        return context.report({
          node,
          messageId: "incorrectExtension",
          data: {
            newExtension,
            extension,
          },
          fix: (fixer) =>
            fixer.replaceTextRange(
              [node.source.range[1] - newExtension.length - 1, node.source.range[1] - 1],
              "js",
            ),
        });
      }

      const relativeImport = importSource.startsWith(".");
      if (!relativeImport) {
        // the extension rules only apply for relative imports
        return;
      }

      if (importSource === "." || importSource === ".." || importSource.endsWith("/")) {
        const withSlash = importSource.endsWith("/") ? 1 : 0;
        const indexFile = "/index.js";
        return context.report({
          node,
          messageId: "missingFile",
          fix: (fixer) =>
            // Insert /index.js and overwrite existing slash if necessary: `from "../"` => `../index.js`
            fixer.replaceTextRange(
              [node.source.range[1] - 1 - withSlash, node.source.range[1] - 1],
              indexFile,
            ),
        });
      }

      if (!importSource.split("/").at(-1)?.includes(".")) {
        return context.report({
          node,
          messageId: "missingExtension",
          fix: (fixer) =>
            // Add .js before the apostrophe: `from "../index"` => `from "../index.js"`
            fixer.insertTextAfterRange([node.source.range[0], node.source.range[1] - 1], ".js"),
        });
      }
    }

    return {
      ImportDeclaration: checkNode,
      ExportNamedDeclaration(node) {
        if (node.source) {
          checkNode(node);
        }
      },
      ExportAllDeclaration: checkNode,
    };
  },
};
