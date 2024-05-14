import trash from "@sit-onyx/icons/trash.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { h } from "vue";
import { createIconSourceCodeTransformer, defineIconSelectArgType } from "../../utils/storybook";
import OnyxIconButton from "./OnyxIconButton.vue";

/**
 * The icon button is a special button which has no visual label.
 */
const meta: Meta<typeof OnyxIconButton> = {
  title: "components/IconButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxIconButton,
    events: ["click"],
    argTypes: {
      icon: defineIconSelectArgType(),
      default: { control: { disable: true } },
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
 * This example shows the button in primary color.
 */
export const Primary = {
  args: {
    label: "Button",
    icon: trash,
  },
} satisfies Story;

/**
 * This example shows the button in neutral color.
 */
export const Neutral = {
  args: {
    label: "Button",
    color: "neutral",
    icon: trash,
  },
} satisfies Story;

/**
 * This example shows the button in danger color.
 */
export const Danger = {
  args: {
    label: "Button",
    color: "danger",
    icon: trash,
  },
} satisfies Story;

/**
 * This example shows the with some custom content.
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
 * This example shows a loading icon button.
 */
export const Loading = {
  args: {
    label: "Button",
    loading: true,
    icon: trash,
  },
} satisfies Story;

/**
 * This example shows a skeleton icon button.
 */
export const Skeleton = {
  args: {
    label: "Button",
    skeleton: true,
  },
} satisfies Story;
