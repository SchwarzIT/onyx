/* eslint-env node */
// see: https://github.com/vuejs/eslint-config-typescript#installation
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "plugin:vuejs-accessibility/recommended",
    // @vue/eslint-config-typescript must be placed after all other configs except @vue/eslint-config-prettier
    // see: https://github.com/vuejs/eslint-config-typescript#vueeslint-config-typescriptrecommended
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
  rules: {
    // Allow usage of @ts-ignore if a description for the reason was provided
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-ignore": "allow-with-description",
      },
    ],
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
};
