"use strict";

const { runClassic } = require("eslint-vitest-rule-tester");
const rule = require("../rules/no-v-bind-props.cjs");

runClassic(
  "define-props-declaration",
  rule,
  {
    valid: [
      {
        filename: "test.vue",
        code: `
        <script setup lang="ts">
          import type { DefineComponent } from "vue";
          type MyComponentT = DefineComponent<{ myprop: string }>;
          const MyComponent = {} as MyComponentT;

          function ref<T>(a: T) {
            return {};
          }

          const props = defineProps<{ a: string }>();
          let a = "a";
          const b = ref<string>("a");
          const c = { a:1 };
        </script>
        <template><MyComponent v-bind="c"/></template>`,
      },
      {
        filename: "test.vue",
        code: `
        <script setup>
          import { h } from "vue";
          const MyComponent = () => h("div", {}, "Hello, World!");
          const props = defineProps({ a: String });
        </script>
        <template>
          <MyComponent v-bind="{ a: props.a }"/>
          <MyComponent v-bind="{ ...props, a: "overwrite" }"/>
        </template>`,
      },
      {
        filename: "test.vue",
        code: `
        <script setup>
          import { h } from "vue";
          const MyComponent = () => h("div", {}, "Hello, World!");

          function ref(a) {
            return {};
          }

          const cProps = defineProps({ a: String });
          let a = "a";
          const b = ref("a");
          const c = { a:1 };
        </script>
        <template><MyComponent v-bind="c"/></template>`,
      },
    ],
    invalid: [
      {
        filename: "test.vue",
        code: `
        <script setup lang="ts">
          import type { DefineComponent } from "vue";
          type MyComponentT = DefineComponent<{ myprop: string }>;
          const MyComponent = {} as MyComponentT;

          function ref<T>(a: T) {
            return {};
          }

          const props = defineProps<{ a: string }>();
          let a = "a";
          const b = ref<string>("a");
          const c = { a:1 };
        </script>
        <template><MyComponent v-bind="props"/></template>`,
        errors: [
          {
            messageId: "boundProps",
            data: { name: "props" },
            line: 16,
            column: 39,
            endLine: 16,
            endColumn: 46,
          },
        ],
      },
      {
        filename: "test.vue",
        code: `
        <script setup>
          import { h } from "vue";
          const MyComponent = () => h("div", {}, "Hello, World!");
          const props = defineProps({ a: String });
        </script>
        <template><MyComponent v-bind="$props"/></template>`,
        errors: [
          {
            messageId: "boundProps",
            data: { name: "$props" },
            line: 7,
            column: 39,
            endLine: 7,
            endColumn: 47,
          },
        ],
      },
      {
        filename: "test.vue",
        code: `
        <script setup>
          import { h } from "vue";
          const MyComponent = () => h("div", {}, "Hello, World!");

          function ref(a) {
            return {};
          }

          const cProps = defineProps({ a: String });
          let a = "a";
          const b = ref("a");
          const c = { a:1 };
        </script>
        <template><MyComponent v-bind="cProps"/></template>`,
        errors: [
          {
            messageId: "boundProps",
            data: { name: "cProps" },
            line: 15,
            column: 39,
            endLine: 15,
            endColumn: 47,
          },
        ],
      },
    ],
  },
  {
    languageOptions: {
      parser: require("vue-eslint-parser"),
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.vue"],
        },
        extraFileExtensions: [".vue"],
        parser: require.resolve("@typescript-eslint/parser"),
      },
    },
  },
);
