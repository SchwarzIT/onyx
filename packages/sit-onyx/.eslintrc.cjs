/* eslint-env node */

/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  root: false, // will be merged with our global config
  extends: ["plugin:playwright/recommended"],
  plugins: ["@sit-onyx", "vue-scoped-css"],
  rules: {
    "no-console": "error",
    "no-debugger": "error",
    "vue/html-button-has-type": "error",
    "vue/require-prop-comment": "error",
    "vue/valid-define-options": "error",
    "vue/no-setup-props-reactivity-loss": "error",
    "vue/no-restricted-syntax": "error",
    "vue/prefer-true-attribute-shorthand": "error",
    "vue/no-loss-of-precision": "error",
    "vue/no-irregular-whitespace": "error",
    "vue/no-console": "error",
    "vue/require-explicit-slots": "error",
    "vue/no-useless-v-bind": "error",
    "vue/no-useless-mustaches": "error",
    "vue/no-root-v-if": "error",
    "vue/no-static-inline-styles": "error",
    "vue/no-unused-refs": "error",
    "vue/no-required-prop-with-default": "error",
    "vue/no-ref-object-reactivity-loss": "error",
    "vue/no-duplicate-attr-inheritance": "error",
    "vue/no-boolean-default": "error",
    "vue/block-order": "error",
    "vue/camelcase": "error",
    "@sit-onyx/import-playwright-a11y": "error",
    "@sit-onyx/no-shadow-native": "error",
    // disallow scoped or module CSS for components
    // see https://onyx.schwarz/principles/technical-vision.html#css
    "vue-scoped-css/enforce-style-type": ["error", { allows: ["plain"] }],
    // we want to provide the flexibility to have the autofocus property.
    // whe JSDoc description includes a warning that it should be used carefully.
    "vuejs-accessibility/no-autofocus": "off",
  },
  overrides: [
    // disable playwright rules for vitest (unit test) files
    {
      files: ["src/**/*.spec.ts"],
      rules: {
        "playwright/no-standalone-expect": "off",
        "vue/no-ref-object-reactivity-loss": "off",
      },
    },
    {
      files: ["src/components/examples/**/*.vue"],
      rules: { "vue-scoped-css/enforce-style-type": "off" },
    },
  ],
};
