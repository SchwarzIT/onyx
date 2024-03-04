import { createIconSourceCodeTransformer, defineIconSelectArgType } from "@/utils/storybook";
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxButton from "./OnyxButton.vue";

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
      icon: defineIconSelectArgType(),
    },
  }),
  parameters: {
    docs: {
      source: {
        // improve code snippet by adding the icon import
        transform: createIconSourceCodeTransformer("icon"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxButton>;

/**
 * This example shows the button in primary variation
 */
export const Primary = {
  args: {
    label: "Button",
  },
} satisfies Story;

/**
 * This example shows the button in secondary variation
 */
export const Secondary = {
  args: {
    label: "Button",
    variation: "secondary",
  },
} satisfies Story;

/**
 * This example shows the button in danger variation
 */
export const Danger = {
  args: {
    label: "Button",
    variation: "danger",
  },
} satisfies Story;

/**
 * This example shows the button with icon
 */
export const WithIcon = {
  args: {
    label: "Button",
    icon: checkSmall,
  },
} satisfies Story;
