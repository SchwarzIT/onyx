import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxMillerItem from "./OnyxMillerItem.vue";

const meta: Meta<typeof OnyxMillerItem> = {
  title: "Navigation/MillerColumn/modules/MillerItem",
  component: OnyxMillerItem,
  argTypes: {
    count: { control: { type: "number" } },
    dotColor: { control: "color" },
    default: { control: { disable: true } },
  },
  args: {
    density: "default",
  },
};

export default meta;
type Story = StoryObj<typeof OnyxMillerItem>;

export const Default: Story = {
  args: {
    label: "Sample item",
    active: false,
    dot: true,
    dotColor: "var(--onyx-color-base-quantitatives-200)",
    count: 25,
    arrow: true,
  },
};

export const Active: Story = {
  args: {
    ...Default.args,
    label: "Active item",
    active: true,
  },
};
