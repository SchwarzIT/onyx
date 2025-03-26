import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxNavItemFacade from "./OnyxNavItemFacade.vue";

/**
 * The nav button is used internally to build the main navigation bar component and is not intended to be used individually.
 */
const meta: Meta<typeof OnyxNavItemFacade> = {
  title: "Navigation/modules/OnyxNavItemFacade",
  component: OnyxNavItemFacade,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OnyxNavItemFacade>;

/**
 * This example shows a default nav button.
 */
export const List = {
  args: {
    context: "list",
    label: "Label",
  },
} satisfies Story;

/**
 * This example shows a default nav button.
 */
export const Mobile = {
  args: {
    context: "mobile",
    label: "Label",
  },
} satisfies Story;

/**
 * This example shows a default nav button.
 */
export const Navbar = {
  args: {
    context: "navbar",
    label: "Label",
  },
} satisfies Story;
