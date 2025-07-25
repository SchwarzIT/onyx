import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Component from "./BrowsersList.vue";

const meta: Meta<typeof Component> = {
  title: "BrowsersList",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default = {
  args: {},
} satisfies Story;
