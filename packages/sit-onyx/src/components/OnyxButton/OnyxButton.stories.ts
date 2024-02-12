import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxButton from "./OnyxButton.vue";
import { BUTTON_COLORS, BUTTON_TYPES, BUTTON_VARIANTS } from "./types";

/**
 * Buttons serve as fundamental components in UI design,
 * acting as gateways for user interactions and pivotal points for
 * initiating actions within an interface.
 * Whether prompting users to submit forms,
 * navigate through pages, or trigger specific functionalities,
 * buttons play a pivotal role in guiding users through their
 * digital journey.
 */
const meta: Meta<typeof OnyxButton> = {
  title: "components/OnyxButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxButton,
    events: ["click"],
    argTypes: {
      type: {
        options: BUTTON_TYPES,
        control: { type: "select" },
      },
      color: {
        options: BUTTON_COLORS,
        control: { type: "select" },
      },
      variant: {
        options: BUTTON_VARIANTS,
        control: { type: "select" },
      },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxButton>;

/**
 * This example shows the button in primary color
 */
export const Primary = {
  args: {
    label: "Button",
  },
} satisfies Story;

/**
 * This example shows the button in secondary color
 */
export const Secondary = {
  args: {
    label: "Button",
    color: "secondary",
  },
} satisfies Story;

/**
 * This example shows the button in danger color
 */
export const Danger = {
  args: {
    label: "Button",
    color: "danger",
  },
} satisfies Story;
