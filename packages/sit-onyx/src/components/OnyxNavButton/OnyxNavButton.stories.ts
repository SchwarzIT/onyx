import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxNavButton from "./OnyxNavButton.vue";

const meta: Meta<typeof OnyxNavButton> = {
  title: "support/NavButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxNavButton,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxNavButton>;

export const Default = {
  args: {
    default: "Nav Item",
  },
} satisfies Story;

export const Active = {
  args: {
    active: true,
    default: "Nav Item",
  },
} satisfies Story;
