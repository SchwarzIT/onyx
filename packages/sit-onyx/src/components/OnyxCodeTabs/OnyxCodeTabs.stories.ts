import { iconBrowserTerminal } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import OnyxCodeTab from "../OnyxCodeTab/OnyxCodeTab.vue";
import OnyxCodeTabs from "./OnyxCodeTabs.vue";

/**
 * Component for displaying one or multiple code snippets.
 *
 * This component does NOT take care of proper syntax highlighting. If you want to use syntax highlighting, consider using a library like [Shiki](https://shiki.style/)
 * or [Nuxt content](https://content.nuxt.com/docs/files/markdown#code-highlighting) and add the highlighted HTML using the slot of the passed OnyxCodeTab component.
 */
const meta: Meta<typeof OnyxCodeTabs> = {
  title: "Documentation/CodeTabs",
  component: OnyxCodeTabs as Meta["component"],
  tags: ["new:component"],
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
        icon: iconBrowserTerminal,
        code: `<script lang="ts" setup>
import { ref } from "vue";

const message = ref("Hello World");
</script>

<template> {{ message }} </template>`,
      }),
    ],
  },
} satisfies Story;

export const SingleTab = {
  args: {
    ...Default.args,
    default: () => Default.args.default()[0],
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
