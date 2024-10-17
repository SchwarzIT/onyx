// @ts-check
import eslint from "@eslint/js";
import { gitignoreToMinimatch } from "@humanwhocodes/gitignore-to-minimatch";
import skipFormattingConfig from "@vue/eslint-config-prettier/skip-formatting";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import playwrightEslintConfig from "eslint-plugin-playwright";
import vue from "eslint-plugin-vue";
import vueScopedCss from "eslint-plugin-vue-scoped-css";
import vueA11y from "eslint-plugin-vuejs-accessibility";
import { readFileSync } from "fs";
import { join } from "path";
import tseslint from "typescript-eslint";
import sitOnyx from "./packages/eslint-plugin/src/index.cjs";

const CUSTOM_IGNORES = ["**/playwright.config.ts", "**/playwright/index.ts", "**/vitest.config.ts"];

const ignores = readFileSync(join(import.meta.dirname, ".gitignore"), "utf-8")
  .split("\n")
  .map(gitignoreToMinimatch)
  .filter(Boolean)
  .concat(CUSTOM_IGNORES);

const playwrightConfig = tseslint.config({
  files: ["**/*.ct.{js,jsx,ts,tsx}"],
  extends: [playwrightEslintConfig.configs["flat/recommended"]],
});

export default tseslint.config(
  eslint.configs.recommended,
  ...playwrightConfig,
  ...vueScopedCss.configs["flat/recommended"],
  {
    files: ["**/*.{js,jsx,ts,tsx,vue}"],
    extends: [
      ...vue.configs["flat/recommended"],
      ...vueA11y.configs["flat/recommended"],
      ...vueTsEslintConfig({ extends: ["recommendedTypeChecked"] }),
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: ".",
      },
    },
    plugins: { sitOnyx },
    rules: {
      "sitOnyx/import-playwright-a11y": "error",
      "sitOnyx/no-shadow-native": "error",
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
      "vue/require-default-prop": "off",
      "vuejs-accessibility/label-has-for": [
        "error",
        {
          required: {
            some: ["nesting", "id"],
          },
        },
      ],
      "vue/no-multiple-template-root": "error",
      "@typescript-eslint/no-unused-expressions": ["error", { allowShortCircuit: true }],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": "allow-with-description",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
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
      // disallow scoped or module CSS for components
      // see https://onyx.schwarz/principles/technical-vision.html#css
      "vue-scoped-css/enforce-style-type": ["error", { allows: ["plain"] }],
      // we want to provide the flexibility to have the autofocus property.
      // whe JSDoc description includes a warning that it should be used carefully.
      "vuejs-accessibility/no-autofocus": "off",
      // unfortunately there is a bug with using nested property declaration: https://github.com/future-architect/eslint-plugin-vue-scoped-css/issues/371
      // but parsing errors should be caught by the compiler anyways
      "vue-scoped-css/no-parsing-error": "off",
    },
  },
  {
    files: ["**/examples/**", "./apps/**"],
    rules: {
      "vue-scoped-css/enforce-style-type": "off",
    },
  },
  skipFormattingConfig,
  { ignores },
);
