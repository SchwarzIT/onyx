import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxNavItemMobile from "./OnyxNavItemMobile.vue";

/**
 * The nav button is used internally to build the main navigation bar component and is not intended to be used individually.
 */
const meta: Meta<typeof OnyxNavItemMobile> = {
  title: "Navigation/modules/OnyxNavItemMobile",
  component: OnyxNavItemMobile,
  argTypes: {
    default: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxNavItemMobile>;

/**
 * This example shows a default nav button.
 */
export const Default = {
  args: {
    default: () => "Mobile Nav Item",
  },
} satisfies Story;

/**
 * This example shows the nav item with external link.
 */
export const WithLink = {
  args: {
    ...Default.args,
    link: {
      href: "https://onyx.schwarz",
      target: "_blank",
    },
  },
} satisfies Story;

/**
 * This example shows an active nav button.
 */
export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;
