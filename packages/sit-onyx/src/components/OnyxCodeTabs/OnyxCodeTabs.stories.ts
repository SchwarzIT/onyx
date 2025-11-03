import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxCodeTab from "../OnyxCodeTab/OnyxCodeTab.vue";
import OnyxCodeTabs from "./OnyxCodeTabs.vue";

const meta: Meta<typeof OnyxCodeTabs> = {
  title: "Documentation/CodeTabs",
  component: OnyxCodeTabs as Meta["component"],
  tags: ["unstable"],
  argTypes: {
    default: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxCodeTabs>;

export const Default = {
  args: {
    label: "Example code snippets",
    modelValue: "tab-1",
    default: () => [
      h(OnyxCodeTab, {
        value: "tab-1",
        label: "index.ts",
        language: "ts",
        code: `export function sayHello(message: string) {
  console.log(message);
}`,
      }),
      h(OnyxCodeTab, {
        value: "tab-2",
        label: "style.css",
        language: "css",
        code: `.some-class {
  color: var(--onyx-color-text-icons-neutral-intense);
}`,
      }),
      h(OnyxCodeTab, {
        value: "tab-3",
        label: "Component.vue",
        language: "vue",
        code: `<script lang="ts" setup>
import { ref } from "vue";

const message = ref("Hello World");
</script>

<template> {{ message }} </template>`,
      }),
    ],
  },
} satisfies Story;
