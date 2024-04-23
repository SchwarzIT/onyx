import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxNavItem from "./OnyxNavItem.vue";

/**
 * This component helps to build the main navigationBar component and is not promoted for singular usage at all.
 */
const meta: Meta<typeof OnyxNavItem> = {
  title: "components/OnyxNavItem",
  ...defineStorybookActionsAndVModels({
    component: OnyxNavItem,
    events: ["navigate"],
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
 * This example shows a default navItem.
 */
export const Default = {
  args: {
    label: "Item",
    href: "#",
  },
} satisfies Story;

/**
 * This example shows an active navItem.
 */
export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;

/**
 * This example shows the navItem with nested children.
 */
export const WithChildren = {
  args: {
    ...Default.args,
    options: [
      { label: "Nested Item 1", href: "#", active: true },
      { label: "Nested Item 2", href: "#2" },
      { label: "Nested Item 3", href: "#3" },
      { label: "Nested Item 4", href: "#4" },
      { label: "Nested Item 5", href: "#5" },
    ],
  },
} satisfies Story;
