import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxLink from "./OnyxLink.vue";

/**
 * Links are the tool of choice to refer to another page.
 */
const meta: Meta<typeof OnyxLink> = {
  title: "components/OnyxLink",
  ...defineStorybookActionsAndVModels({
    component: OnyxLink,
    events: ["click"],
    argTypes: {
      default: {
        control: { disabled: true },
      },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxLink>;

/**
 * A default link that opens the page in the same tab.
 */
export const Default = {
  args: {
    default: () => "Click me",
    href: "https://onyx.schwarz",
  },
} satisfies Story;

/**
 * A link that opens the page in a new tab.
 */
export const NewTab = {
  args: {
    ...Default.args,
    target: "_blank",
  },
} satisfies Story;
