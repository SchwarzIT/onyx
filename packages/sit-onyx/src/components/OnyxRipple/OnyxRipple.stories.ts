import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxRipple from "./OnyxRipple.vue";

/**
 * OnyxRipple provides visual feedback when a user interacts with the component. Supporting both touch and mouse events.
 */
const meta: Meta<typeof OnyxRipple> = {
  title: "Support/OnyxRipple",
  ...defineStorybookActionsAndVModels({
    component: OnyxRipple,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxRipple>;

/**
 * Default properties like color and durations can be overridden. Click anywhere to create a ripple.
 */
export const Default = {
  args: {},
} satisfies Story;
