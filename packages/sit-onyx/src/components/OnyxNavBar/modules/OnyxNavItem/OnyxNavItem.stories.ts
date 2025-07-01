import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import OnyxBadge from "../../../OnyxBadge/OnyxBadge.vue";
import OnyxNavItem from "./OnyxNavItem.vue";

/**
 * The `OnyxNavItem` is used to build the navigation bar component and not intended to be used standalone.
 * Based on the context and if the `link` property is provided, it will either be rendered as a button or anchor element.
 * Links are integrated with the provided router.
 */
const meta: Meta<typeof OnyxNavItem> = {
  title: "Navigation/NavBar/modules/NavItem",
  component: OnyxNavItem,
  argTypes: {
    default: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxNavItem>;

/**
 * This example shows a default nav item.
 */
export const Default = {
  args: {
    label: "Nav Item",
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
    children: () => {
      return [
        h(OnyxNavItem, { label: "Nested Item 1", active: true }),
        h(
          OnyxNavItem,
          { label: "Nested Item 2" },
          {
            children: () => [
              h(OnyxNavItem, { label: "Nested Item 2.1" }),
              h(OnyxNavItem, { label: "Nested Item 2.2" }),
              h(OnyxNavItem, { label: "Nested Item 2.3" }),
            ],
          },
        ),
        h(OnyxNavItem, { label: "Nested Item 3" }),
        h(OnyxNavItem, { label: "Nested Item 4" }),
        h(OnyxNavItem, { label: "Nested Item 5" }),
      ];
    },
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
