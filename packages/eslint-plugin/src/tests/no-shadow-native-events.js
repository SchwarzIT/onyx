/* eslint-disable @typescript-eslint/no-require-imports */
"use strict";

const { RuleTester } = require("eslint");
const rule = require("../rules/no-shadow-native-events.cjs");

const tester = new RuleTester({
  languageOptions: {
    parser: require("vue-eslint-parser"),
    ecmaVersion: 2020,
    sourceType: "module",
  },
});
tester.run("no-native-event-emits", rule, {
  valid: [
    {
      code: `
          <script setup>
          defineEmits(['customClick']);
          </script>
        `,
    },
    {
      code: `
          <script>
          export default {
            emits: ['customSubmit'],
            methods: {
              emitSomething() {
                this.$emit('customChange');
              },
            },
          };
          </script>
        `,
    },
    {
      code: `
          <script>
          export default {
            emits: ['customHover'],
          };
          </script>
        `,
    },
  ],
  invalid: [
    {
      code: `
          <script setup>
          defineEmits(['click']);
          </script>
        `,
      errors: [
        {
          message:
            'Use a different emit name to avoid shadowing the native event with name "click". Consider an emit name which communicates the users intent, if applicable.',
        },
      ],
    },
    {
      code: `
          <script setup>
          const emit = defineEmits(['focus']);
          emit('focus');
          </script>
        `,
      errors: [
        {
          message:
            'Use a different emit name to avoid shadowing the native event with name "focus". Consider an emit name which communicates the users intent, if applicable.',
        },
      ],
    },
    {
      code: `
         <template>
          <div @click="$emit('submit')">
          </div>
        </template>
        `,
      errors: [
        {
          message:
            'Use a different emit name to avoid shadowing the native event with name "submit". Consider an emit name which communicates the users intent, if applicable.',
        },
      ],
    },
  ],
});
