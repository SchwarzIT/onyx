import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxListboxOption from "./OnyxListboxOption.vue";

const meta: Meta<typeof OnyxListboxOption> = {
  title: "support/OnyxListboxOption",
  ...defineStorybookActionsAndVModels({
    component: OnyxListboxOption,
    events: ["update:modelValue"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxListboxOption>;

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
