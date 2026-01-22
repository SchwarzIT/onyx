import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxTableOfContentsItem from "./OnyxTableOfContentsItem.vue";

const meta: Meta<typeof OnyxTableOfContentsItem> = {
  title: "Support/TableOfContentsItem",
  component: OnyxTableOfContentsItem,
  tags: ["unstable"],
};

export default meta;
type Story = StoryObj<typeof OnyxTableOfContentsItem>;

export const Default = {
  args: {
    default: "Example item",
    link: "#section-1",
  },
} satisfies Story;

export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;
