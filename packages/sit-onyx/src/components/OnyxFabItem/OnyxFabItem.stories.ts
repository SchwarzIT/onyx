import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxFabItem from "./OnyxFabItem.vue";

const meta: Meta<typeof OnyxFabItem> = {
  title: "Support/FabItem",
  component: OnyxFabItem,
  tags: ["new:component"],
};

export default meta;
type Story = StoryObj<typeof OnyxFabItem>;

export const Default = {
  args: {
    label: "Button",
  },
} satisfies Story;
