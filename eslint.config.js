// @ts-check
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";

const ignores = [
  "node_modules",
  "dist",
  "coverage",
  "test-results",
  "playwright-report",
  ".cache",
  "cache",
  "storybook-static",
].map((folder) => `**/${folder}/**/*`);

export default [
  { ...js.configs.recommended, ignores },
  ...pluginVue.configs["flat/recommended"],
  ...pluginVueA11y.configs["flat/recommended"],
  // @vue/eslint-config-typescript must be placed after all other configs except @vue/eslint-config-prettier
  // TODO: add @vue/eslint-config-typescript/recommended and @vue/eslint-config-prettier/skip-formatting once they support flat configs
  {
    files: ["**/*.vue", "**/*.ts", "**/*.tsx"],
    ignores,
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
    rules: {
      // allow unused vars if they start with an underscore. Useful e.g. if destructuring arrays
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // see https://eslint.vuejs.org/rules/html-self-closing
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "never",
            component: "always",
          },
        },
      ],
      // this rule is only really relevant for the options API so we disable it here
      // see: https://eslint.vuejs.org/rules/require-default-prop
      "vue/require-default-prop": "off",
      // by default all labels must have a "for" even when an input is nested inside it,
      // we soften this rule to pass in this case
      // see: https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/label-has-for.html
      "vuejs-accessibility/label-has-for": [
        "error",
        {
          required: {
            some: ["nesting", "id"],
          },
        },
      ],
    },
  },
];
