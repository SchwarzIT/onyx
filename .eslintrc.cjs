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
    // @vue/eslint-config-typescript must be placed after all other configs except @vue/eslint-config-prettier
    // see: https://github.com/vuejs/eslint-config-typescript#vueeslint-config-typescriptrecommended
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
};
