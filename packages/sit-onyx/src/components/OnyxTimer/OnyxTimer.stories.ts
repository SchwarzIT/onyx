import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxTimer from "./OnyxTimer.vue";

/**
 * Component to display a timer to the user
 */
const meta: Meta<typeof OnyxTimer> = {
  title: "support/Timer",
  ...defineStorybookActionsAndVModels({
    component: OnyxTimer,
    events: ["timerEnded"],
    argTypes: {},
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxTimer>;

/**
 * This example shows a timer with 30 seconds duration.
 */

const endTime = new Date();
endTime.setTime(Date.now() + 125 * 1000);

export const Default = {
  args: {
    label: "Test label",
    endTime: endTime.toISOString(),
  },
} satisfies Story;

export const WithoutLabel = {
  args: { ...Default.args, label: undefined },
} satisfies Story;

export const IsPaused = {
  args: { ...Default.args, isPaused: true },
} satisfies Story;
