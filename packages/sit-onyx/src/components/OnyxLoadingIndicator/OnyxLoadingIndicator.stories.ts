import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { textColorDecorator } from "../../utils/storybook.js";
import OnyxLoadingIndicator from "./OnyxLoadingIndicator.vue";

/**
 * The loading indicator can be used to show that some long-running action is currently
 * loading/running.

 * The color will be inherited by the current text color.
 */
const meta: Meta<typeof OnyxLoadingIndicator> = {
  title: "Support/LoadingIndicator",
  component: OnyxLoadingIndicator,
  decorators: [textColorDecorator],
};

export default meta;
type Story = StoryObj<typeof OnyxLoadingIndicator>;

export const Dots = {
  args: {
    type: "dots",
  },
} satisfies Story;

export const Circle = {
  args: {
    type: "circle",
  },
} satisfies Story;
