import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxTreeViewItem from "./OnyxTreeViewItem.vue";

const meta: Meta<typeof OnyxTreeViewItem> = {
  title: "Support/TreeViewItem",
  tags: ["unstable"],
  component: OnyxTreeViewItem,
  argTypes: {
    icon: defineIconSelectArgType(),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxTreeViewItem>;

export const Default = {
  args: {
    icon: iconPlaceholder,
    label: "Label",
  },
} satisfies Story;

export const Active = {
  args: {
    icon: iconPlaceholder,
    label: "Label",
    active: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    icon: iconPlaceholder,
    label: "Label",
    disabled: true,
  },
} satisfies Story;
