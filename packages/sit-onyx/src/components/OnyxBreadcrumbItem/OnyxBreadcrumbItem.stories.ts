import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxBreadcrumbItem from "./OnyxBreadcrumbItem.vue";

/**
 * A single breadcrumb item component. Should be used with the [OnyxBreadcrumb](/docs/navigation-breadcrumb--docs) component.
 * When the `href` prop is provided, the breadcrumb item will be a clickable link. Otherwise it will be a button.
 */
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
