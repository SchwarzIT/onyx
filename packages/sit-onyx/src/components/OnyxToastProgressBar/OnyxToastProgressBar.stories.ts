import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxToastProgressBar from "./OnyxToastProgressBar.vue";

const meta: Meta<typeof OnyxToastProgressBar> = {
  title: "support/ToastProgressBar",
  ...defineStorybookActionsAndVModels({
    component: OnyxToastProgressBar,
    events: ["timerEnded"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxToastProgressBar>;

export const Default = {
  args: {
    duration: 5000,
  },
} satisfies Story;
