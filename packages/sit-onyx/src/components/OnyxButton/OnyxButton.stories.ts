import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxButton from "./OnyxButton.vue";
import { BUTTON_VARIATIONS, BUTTON_TYPES, BUTTON_MODES } from "./types";

const ALL_ICONS = import.meta.glob("../../../node_modules/@sit-onyx/icons/src/assets/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const iconLabels = Object.entries(ALL_ICONS).reduce<Record<string, string>>(
  (labels, [filePath, content]) => {
    labels[content] = filePath.split("/").at(-1)!.replace(".svg", "");
    return labels;
  },
  {},
);

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
      },
      variation: {
        options: BUTTON_VARIATIONS,
      },
      mode: {
        options: BUTTON_MODES,
      },
      icon: {
        options: Object.keys(iconLabels),
        control: {
          type: "select",
          labels: iconLabels,
        },
      },
    },
  }),
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
