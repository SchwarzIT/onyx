import { iconPlaceholder } from "@sit-onyx/icons";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxSplitButton from "./OnyxSplitButton.vue";

/**
 * Buttons serve as fundamental components in UI design,
 * acting as gateways for user interactions and pivotal points for
 * initiating actions within an interface.
 * Whether prompting users to submit forms,
 * navigate through pages, or trigger specific functionalities,
 * buttons play a pivotal role in guiding users through their
 * digital journey.
 */
const meta: Meta<typeof OnyxSplitButton> = {
  title: "Buttons/SplitButton",
  tags: ["unstable"],
  component: OnyxSplitButton,
  argTypes: {
    icon: defineIconSelectArgType(),
    ...withNativeEventLogging(["onClick"]),
  },
};

export default meta;
type Story = StoryObj<typeof OnyxSplitButton>;

/**
 * This example shows the button in primary color
 */
export const Default = {
  args: {
    splitButtonOptions: [
      {
        label: "Option1",
        icon: iconPlaceholder,
        onClickFunction: () => {},
      },
      {
        label: "Option2",
        icon: iconPlaceholder,
        onClickFunction: () => {},
      },
      {
        label: "Option3",
        icon: iconPlaceholder,
        onClickFunction: () => {},
      },
    ],
  },
} satisfies Story;
export const Neutral = {
  args: {
    ...Default.args,
    color: "neutral",
  },
} satisfies Story;

export const Danger = {
  args: {
    ...Default.args,
    color: "danger",
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    loading: true,
  },
} satisfies Story;
export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
