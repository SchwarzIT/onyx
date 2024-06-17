import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { computed, h, provide } from "vue";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import { mobileNavBarInjectionKey } from "../OnyxNavBar/types";
import OnyxNavItem from "./OnyxNavItem.vue";

/**
 * The nav item is used internally to build the main navigation bar component and is not intended to be used individually.
 */
const meta: Meta<typeof OnyxNavItem> = {
  title: "support/NavItem",
  ...defineStorybookActionsAndVModels({
    component: OnyxNavItem,
    events: ["click"],
    argTypes: {
      default: {
        control: { disable: true },
      },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxNavItem>;

/**
 * This example shows a default nav item.
 */
export const Default = {
  args: {
    label: "Item",
    href: "#",
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
 * This example shows the nav item with nested options.
 */
export const WithOptions = {
  args: {
    ...Default.args,
    options: [
      { label: "Nested Item 1", href: "#", active: true },
      { label: "Nested Item 2", href: "https://onyx.schwarz" },
      { label: "Nested Item 3", href: "#3" },
      { label: "Nested Item 4", href: "#4" },
      { label: "Nested Item 5", href: "#5" },
    ],
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
  },
} satisfies Story;

/**
 * This example shows the nav item in mobile mode (will be provided by the OnyxNavBar).
 */
export const Mobile = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    components: { OnyxNavItem },
    setup() {
      provide(
        mobileNavBarInjectionKey,
        computed(() => true),
      );
      return { args };
    },
    template: '<OnyxNavItem v-bind="args" style="width: 24rem;" />',
  }),
} satisfies Story;
