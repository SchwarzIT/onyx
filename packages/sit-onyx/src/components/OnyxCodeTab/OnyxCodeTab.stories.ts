import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxCodeTab from "./OnyxCodeTab.vue";

/**
 * A single code tab component. Only intended to be used with the [OnyxCodeTabs](/docs/documentation-codetabs--docs) component.
 */
const meta: Meta<typeof OnyxCodeTab> = {
  title: "Support/CodeTab",
  component: OnyxCodeTab,
  tags: ["new:component"],
};

export default meta;
type Story = StoryObj<typeof OnyxCodeTab>;

export const Default = {
  args: {
    value: "tab-1",
    code: "console.log('Hello, World!');",
    language: "ts",
    label: "index.ts",
  },
} satisfies Story;
