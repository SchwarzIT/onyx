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
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxTimer>;

/**
 * This example shows a timer with 30 seconds duration.
 */

export const Default: Story = {
  render: (args, { loaded: { endTime } }) => ({
    components: { OnyxTimer },
    setup() {
      return { args, endTime: endTime };
    },
    template: '<OnyxTimer :end-time="endTime" label="An example timer:" />',
  }),
  loaders: [
    () => {
      const endTime = new Date();
      endTime.setTime(Date.now() + 30 * 1000);
      return { endTime };
    },
  ],
};

export const WithMinutes: Story = {
  ...Default,
  loaders: [
    () => {
      const endTime = new Date();
      endTime.setTime(Date.now() + 70 * 1000);
      return { endTime };
    },
  ],
} satisfies Story;

export const WithHours: Story = {
  ...Default,
  loaders: [
    () => {
      const endTime = new Date();
      endTime.setTime(Date.now() + 60 * 125 * 1000);
      return { endTime };
    },
  ],
} satisfies Story;

/**
 * This example shows a timer in paused state.
 */

export const PausedState: Story = {
  ...Default,
  render: (args, { loaded: { endTime } }) => ({
    components: { OnyxTimer },
    setup() {
      return { args, endTime: endTime };
    },
    template: '<OnyxTimer :end-time="endTime" label="Timer paused:" :is-paused="true" />',
  }),
  loaders: [
    () => {
      const endTime = new Date();
      endTime.setTime(Date.now() + 6 * 1000);
      return { endTime };
    },
  ],
} satisfies Story;
