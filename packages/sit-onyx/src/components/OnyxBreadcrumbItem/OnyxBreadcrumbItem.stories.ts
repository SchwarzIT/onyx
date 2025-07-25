import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxBreadcrumbItem from "./OnyxBreadcrumbItem.vue";

const meta: Meta<typeof OnyxBreadcrumbItem> = {
  title: "Support/BreadcrumbItem",
  component: OnyxBreadcrumbItem,
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

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
