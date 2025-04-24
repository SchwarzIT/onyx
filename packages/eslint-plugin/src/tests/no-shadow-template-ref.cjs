"use strict";

const { RuleTester } = require("eslint");
const rule = require("../rules/no-shadow-template-ref.cjs");

const tester = new RuleTester({
  languageOptions: {
    parser: require("vue-eslint-parser"),
    ecmaVersion: 2020,
    sourceType: "module",
  },
});
tester.run("no-shadow-template-ref", rule, {
  valid: [
    {
      code: `
          <script setup>
            const parentRef = useTemplateRef("parentRefEl");
          </script>
        `,
    },
    {
      code: `
          <script setup>
            const myRef = ref("myRef");
          </script>
        `,
    },
  ],
  invalid: [
    {
      code: `
          <script setup>
            const parentRef = useTemplateRef("parentRef");
          </script>
        `,
      errors: [
        {
          message:
            "Use a different name to avoid Vue runtime warnings about failing set operations on readonly target. See https://github.com/vuejs/core/issues/12852.",
        },
      ],
    },
    {
      code: `
          <script setup>
            const element = useTemplateRef("elementRef");
            const parent = useTemplateRef("parent");
          </script>
        `,
      errors: [
        {
          message:
            "Use a different name to avoid Vue runtime warnings about failing set operations on readonly target. See https://github.com/vuejs/core/issues/12852.",
        },
      ],
    },
  ],
});
