import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxNavItemFacade from "./OnyxNavItemFacade.vue";

/**
 * This support component wraps the `OnyxMenuItem` and styles it according to the given context.
 * It allows us to use the same API and HTML structure in all possible contexts.
 */
const meta: Meta<typeof OnyxNavItemFacade> = {
  title: "Support/NavItemFacade",
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
