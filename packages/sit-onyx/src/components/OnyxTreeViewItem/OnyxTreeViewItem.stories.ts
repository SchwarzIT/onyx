import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
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
    default: () => "Item content...",
    style: "max-width: 16rem",
  },
} satisfies Story;

export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;

export const CustomContent = {
  args: {
    style: "max-width: 16rem",
    default: Default.args.default,
    item: () => [Default.args.label, h(OnyxTag, { label: "Tag" })],
  },
} satisfies Story;
