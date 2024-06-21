import type { Meta, StoryObj } from "@storybook/vue3";
import Grid from "./GridPlayground.vue";

/**
 * The GridPlayground allows to test and play around with the Onyx grid system
 */
const meta: Meta<typeof Grid> = {
  title: "Examples/GridPlayground",
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

/**
 * Please open in Fullscreen mode for playground to behave correctly!
 */
export const Default = {
  args: {},
} satisfies Story;
