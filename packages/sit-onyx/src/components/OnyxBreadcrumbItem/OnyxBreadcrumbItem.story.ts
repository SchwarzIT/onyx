import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxBreadcrumbItem from "./OnyxBreadcrumbItem.vue";

const meta: Meta<typeof OnyxBreadcrumbItem> = {
  title: "Support/BreadcrumbItem",
  component: OnyxBreadcrumbItem,
};

export default meta;
type Story = StoryObj<typeof OnyxBreadcrumbItem>;

export const Default = { args: {} } satisfies Story;
