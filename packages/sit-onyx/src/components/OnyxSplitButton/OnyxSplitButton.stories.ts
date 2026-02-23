import { iconPlaceholder } from "@sit-onyx/icons";
import { withNativeEventLogging } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { action } from "storybook/actions";
import { h } from "vue";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSplitButton from "./OnyxSplitButton.vue";

/**
 * The SplitButton is used to have multiple actions alongside a group of similar actions.
 * The main action will be displayed on the left and will be triggered immediately after clicking.
 * On the right side and behind an icon are multiple actions which can be individual or can extend the functionality of the main action.
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
    label: "Click me!",
    options: () => [
      h(OnyxMenuItem, {
        label: "Option 1",
        icon: iconPlaceholder,
        onClick: action("click"),
      }),
      h(OnyxMenuItem, {
        label: "Option 2",
        icon: iconPlaceholder,
        onClick: action("click"),
      }),
      h(OnyxMenuItem, {
        label: "Option 3",
        icon: iconPlaceholder,
        onClick: action("click"),
      }),
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
