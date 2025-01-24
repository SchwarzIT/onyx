import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBadge from "../../../OnyxBadge/OnyxBadge.vue";
import OnyxNavItem from "./OnyxNavItem.vue";

/**
 * The nav item is used internally to build the main navigation bar component and is not intended to be used individually.
 */
const meta: Meta<typeof OnyxNavItem> = {
  title: "Navigation/modules/NavItem",
  component: OnyxNavItem,
  argTypes: {
    default: { control: { type: "text" } },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="max-width: 16rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxNavItem>;

/**
 * This example shows a default nav item.
 */
export const Default = {
  args: {
    label: "Item",
  },
} satisfies Story;

/**
 * This example shows an active nav item.
 */
export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;

/**
 * This example shows the nav item with additional content (a dot badge in this case).
 */
export const WithCustomContent = {
  args: {
    ...Default.args,
    default: () => ["Custom label", h(OnyxBadge, { dot: true, color: "warning" })],
  },
} satisfies Story;

/**
 * This example shows the nav item with external link.
 */
export const WithExternalLink = {
  args: {
    label: "onyx",
    href: "https://onyx.schwarz/",
    target: "_blank",
  },
} satisfies Story;
