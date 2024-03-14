import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxFlyoutOption from "./OnyxFlyoutOption.vue";

const meta: Meta<typeof OnyxFlyoutOption> = {
  title: "support/OnyxFlyoutOption",
  ...defineStorybookActionsAndVModels({
    component: OnyxFlyoutOption,
    events: ["update:modelValue"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxFlyoutOption>;

export const Default = {
  args: {
    label: "Test label",
  },
} satisfies Story;

export const Selected = {
  args: {
    ...Default.args,
    modelValue: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;
