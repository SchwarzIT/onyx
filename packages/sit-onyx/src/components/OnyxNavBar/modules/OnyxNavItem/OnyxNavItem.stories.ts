import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBadge from "../../../OnyxBadge/OnyxBadge.vue";
import OnyxNavItem from "./OnyxNavItem.vue";

/**
 * The nav item is used to build the navigation bar component and not intended to be used standalone.
 */
const meta: Meta<typeof OnyxNavItem> = {
  title: "Navigation/modules/NavButton",
  component: OnyxNavItem,
  argTypes: {
    default: {
      control: { type: "text" },
    },
  },
};

const nestedChildren = [
  { label: "Nested Item 1" },
  { label: "Nested Item 2", active: true },
  { label: "Nested Item 3" },
  { label: "Nested Item 4" },
  { label: "Nested Item 5" },
];

export default meta;
type Story = StoryObj<typeof OnyxNavItem>;

/**
 * This example shows a default nav item.
 */
export const Default = {
  args: {
    label: "Nav Button",
  },
} satisfies Story;

/**
 * This example shows the nav item with external link.
 */
export const WithLink = {
  args: {
    label: "Documentation",
    link: {
      href: "https://onyx.schwarz",
      target: "_blank",
    },
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
 * This example shows the nav item with nested children.
 */
export const WithChildren: Story = {
  args: {
    ...Default.args,
    active: true,
    children: () =>
      nestedChildren.map(({ label, active }) => h(OnyxNavItem, { link: "#", active, label })),
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="height: 16rem"> <story /> </div>`,
    }),
  ],
};

/**
 * This example shows the nav button with additional content (a dot badge in this case).
 */
export const WithCustomContent = {
  args: {
    ...Default.args,
    default: ["Custom label", h(OnyxBadge, { dot: true, color: "warning" })],
  },
} satisfies Story;
