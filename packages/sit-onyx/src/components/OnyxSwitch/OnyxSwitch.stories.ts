import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxSwitch from "./OnyxSwitch.vue";

/**
 * Toggle switches are a common ui element used to controll binary states, such as on/off, enable/disable/, or active/inactive.
 * They consist of a toggle mechanism that allow users to switch between two distinct states with a simple interaction.
 */
const meta: Meta<typeof OnyxSwitch> = {
  title: "components/OnyxSwitch",
  ...defineStorybookActionsAndVModels({
    component: OnyxSwitch,
    events: ["update:modelValue"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxSwitch>;

/**
 * This example shows the default checked state of the switch.
 */
export const DefaultChecked = {
  args: {
    label: "Switch",
    modelValue: true,
  },
} satisfies Story;

/**
 * This example shows the default unchecked state of the switch.
 */
export const DefaultUnchecked = {
  args: {
    label: "Switch",
    modelValue: false,
  },
} satisfies Story;

/**
 * This example shows the invalid state of the switch.
 */
export const Invalid = {
  args: {
    ...DefaultChecked.args,
    invalid: true,
  },
} satisfies Story;

/**
 * This example shows the readonly state of the switch.
 */
export const Readonly = {
  args: {
    ...DefaultChecked.args,
    readonly: true,
  },
} satisfies Story;
