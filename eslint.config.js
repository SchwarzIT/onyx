import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import pluginVitest from "@vitest/eslint-plugin";
import skipFormattingConfig from "@vue/eslint-config-prettier/skip-formatting";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import compat from "eslint-plugin-compat";
import playwrightEslintConfig from "eslint-plugin-playwright";
import vue from "eslint-plugin-vue";
import vueScopedCss from "eslint-plugin-vue-scoped-css";
import vueA11y from "eslint-plugin-vuejs-accessibility";
import { fileURLToPath } from "node:url";
import tsEslint from "typescript-eslint";
import sitOnyx from "./packages/eslint-plugin/src/index.cjs";

/**
 * General Vue and TypeScript lint rules without typechecked lint rules.
 * Linting with typechecking has been disabled by default to improve lint performance.
 * Enabling the projectService and typechecked lint rules increases linting times drastically (from 20s to about 100s for the whole project)
 */
const generalVueTsConfig = {
  name: "general-vue-ts",
  files: ["**/*.{js,jsx,ts,tsx,vue}"],
  extends: [
    ...defineConfigWithVueTs(vue.configs["flat/recommended"], vueTsConfigs.recommended),
    ...vueA11y.configs["flat/recommended"],
  ],
  plugins: { sitOnyx },
  rules: {
    "sitOnyx/no-esm-incompatible-imports": "error",
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
    // we want to provide the flexibility to have the autofocus property.
    // the JSDoc description includes a warning that it should be used carefully.
    "vuejs-accessibility/no-autofocus": "off",
    // irrelevant rule for vue 3, as it allows multiple root elements
    "vue/no-multiple-template-root": "off",
    "vuejs-accessibility/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
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
    "vue/no-console": "error",
    "vue/html-button-has-type": "error",
    "vue/valid-define-options": "error",
    "vue/no-setup-props-reactivity-loss": "error",
    "vue/no-restricted-syntax": "error",
    "vue/prefer-true-attribute-shorthand": "error",
    "vue/no-loss-of-precision": "error",
    "vue/no-irregular-whitespace": "error",
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
    "vue/block-tag-newline": "error",
    "vue/block-order": "error",
    "vue/padding-line-between-blocks": "error",
    "vue/block-lang": [
      "error",
      {
        script: {
          lang: "ts",
        },
      },
    ],
    "vue/camelcase": "error",
    "vue/prefer-use-template-ref": "error",
  },
};

const playwrightConfig = {
  name: "onyx-playwright",
  files: ["**/*.ct.{js,jsx,ts,tsx,vue}"],
  extends: [playwrightEslintConfig.configs["flat/recommended"]],
  rules: {
    "playwright/expect-expect": [
      "warn",
      {
        assertFunctionNames: [
          "executeChartScreenshotTest",
          "menuButtonTesting",
          "navigationTesting",
          "listboxTesting",
          "tabsTesting",
          "comboboxTesting",
          "comboboxSelectOnlyTesting",
        ],
      },
    ],
    "vue/require-prop-comment": "off",
  },
};

const vitestConfig = {
  name: "onyx-vitest",
  files: ["**/*.spec.{js,jsx,ts,tsx}"],
  extends: [pluginVitest.configs.recommended],
  rules: {
    "vue/no-ref-object-reactivity-loss": "off",
  },
};

/**
 * Lint config to allow console calls in scripts and CLI packages
 */
const noConsoleConfig = {
  name: "onyx-no-console",
  files: ["**/packages/figma-utils/**", "**/scripts/**"],
  rules: {
    "no-console": "off",
  },
};

/**
 * Lint config for the core `sit-onyx` package.
 * We enable projectService and typechecked lint rules for this package.
 */
const sitOnyxConfig = {
  name: "onyx-sit-onyx",
  files: ["**/packages/sit-onyx/**/*"],
  extends: [
    compat.configs["flat/recommended"],
    ...defineConfigWithVueTs(vue.configs["flat/recommended"], vueTsConfigs.recommendedTypeChecked),
    ...vueScopedCss.configs["flat/recommended"],
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
  plugins: { sitOnyx },
  rules: {
    "sitOnyx/import-playwright-a11y": "error",
    "sitOnyx/no-shadow-template-ref": "error",
    "sitOnyx/no-shadow-native": "error",
    "sitOnyx/require-root-class": "error",
    "vue/require-prop-comment": "error",
    // disallow scoped or module CSS for components
    // see https://onyx.schwarz/principles/technical-vision.html#css
    "vue-scoped-css/enforce-style-type": ["error", { allows: ["plain"] }],
  },
  ignores: ["**/examples/**"],
};

const gitignorePath = fileURLToPath(import.meta.resolve("./.gitignore"));
/**
 * Config that excludes all files that are not tracked by git
 */
const gitignoreConfig = includeIgnoreFile(gitignorePath);

/**
 * files that are excluded for different reasons
 */
const specificIgnoreConfig = {
  name: "onyx-ignores",
  ignores: [
    "**/playwright.config.ts",
    "**/playwright/index.ts",
    "**/vitest.config.ts",
    "**/.storybook/{main,preview}.ts",
    "packages/sit-onyx/build/index.js",
  ],
};

const nuxtConfig = {
  files: ["packages/nuxt*/**/*"],
  rules: {
    "vue/multi-word-component-names": "off",
  },
};

const eslintCommentsConfig = {
  name: "onyx-eslint-comments",
  extends: [comments.recommended],
  rules: {
    "@eslint-community/eslint-comments/require-description": [
      "error",
      { ignore: ["eslint-enable"] },
    ],
  },
};

export default tsEslint.config(
  eslint.configs.recommended,
  eslintCommentsConfig,
  generalVueTsConfig,
  vitestConfig,
  sitOnyxConfig,
  playwrightConfig,
  nuxtConfig,
  noConsoleConfig,
  skipFormattingConfig,
  gitignoreConfig,
  specificIgnoreConfig,
);
