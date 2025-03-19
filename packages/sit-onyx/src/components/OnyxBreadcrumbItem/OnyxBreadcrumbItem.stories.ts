import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxBreadcrumbItem from "./OnyxBreadcrumbItem.vue";

const meta: Meta<typeof OnyxBreadcrumbItem> = {
  title: "Navigation/BreadcrumbItem",
  component: OnyxBreadcrumbItem,
  tags: ["new:component"],
};

export default meta;
type Story = StoryObj<typeof OnyxBreadcrumbItem>;

export const Default = {
  args: {
    default: "Example page",
    href: "#some-page",
  },
} satisfies Story;

export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;
