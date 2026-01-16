import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxTableOfContents from "./OnyxTableOfContents.vue";

const meta: Meta<typeof OnyxTableOfContents> = {
  title: "Navigation/TableOfContents",
  component: OnyxTableOfContents,
  tags: ["unstable"],
};

export default meta;
type Story = StoryObj<typeof OnyxTableOfContents>;

export const Default = { args: {} } satisfies Story;
