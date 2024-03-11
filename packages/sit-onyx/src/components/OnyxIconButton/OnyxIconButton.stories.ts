import { createIconSourceCodeTransformer, defineIconSelectArgType } from "@/utils/storybook";
import checkSmall from "@sit-onyx/icons/message-dots.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxIconButton from "./OnyxIconButton.vue";
import { h } from "vue";

/**
 * Icon Buttons are special button which has no visual label.
 */
const meta: Meta<typeof OnyxIconButton> = {
  title: "components/OnyxIconButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxIconButton,
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
type Story = StoryObj<typeof OnyxIconButton>;

/**
 * This example shows the button in primary variation
 */
export const Primary = {
  args: {
    label: "Button",
    icon: checkSmall,
  },
} satisfies Story;

/**
 * This example shows the button in secondary variation
 */
export const Secondary = {
  args: {
    label: "Button",
    variation: "secondary",
    icon: checkSmall,
  },
} satisfies Story;

/**
 * This example shows the button in danger variation
 */
export const Danger = {
  args: {
    label: "Button",
    variation: "danger",
    icon: checkSmall,
  },
} satisfies Story;

/**
 * This example shows the with some custom content
 */
export const Custom = {
  args: {
    label: "Button",
    default: () =>
      h(
        "figure",
        { style: "margin: 0; width: 24px; height: 24px; display: grid; place-items: center" },
        "🎉",
      ),
  },
} satisfies Story;

/**
 * This example shows the button in danger variation
 */
export const Loading = {
  args: {
    label: "Button",
    loading: true,
    icon: checkSmall,
  },
} satisfies Story;
