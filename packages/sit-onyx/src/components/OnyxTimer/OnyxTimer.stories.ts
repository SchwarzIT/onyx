import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxTimer from "./OnyxTimer.vue";

/**
 * Component to display a timer to the user.
 */
const meta: Meta<typeof OnyxTimer> = {
  title: "support/Timer",
  ...defineStorybookActionsAndVModels({
    component: OnyxTimer,
    events: ["timerEnded"],
    argTypes: {
      endTime: { control: { type: "date" } },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxTimer>;

const getEndTime = (offset: number) => {
  const endTime = new Date();
  endTime.setTime(Date.now() + offset);
  return endTime;
};

/**
 * This example shows a timer with 30 seconds duration.
 */
export const Seconds = {
  args: {
    endTime: getEndTime(30 * 1000),
  },
} satisfies Story;

export const Minutes = {
  args: {
    endTime: getEndTime(5 * 60 * 1000),
  },
} satisfies Story;

export const Hours = {
  args: {
    endTime: getEndTime(125 * 60 * 1000),
  },
} satisfies Story;

export const WithLabel = {
  args: {
    ...Minutes.args,
    label: "Label",
  },
} satisfies Story;
