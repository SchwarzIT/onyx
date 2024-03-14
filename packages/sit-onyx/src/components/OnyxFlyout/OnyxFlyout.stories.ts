import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxFlyout from "./OnyxFlyout.vue";

/**
 * The flyout is a fundamental element utilized across various components such as
 * dropdowns, navigation bars, paginations, tables, etc.
 * It provides the users with the ability to open a small modal window,
 * facilitating single or multi-selection based on the context in which it is employed.
 */
const meta: Meta<typeof OnyxFlyout> = {
  title: "support/OnyxFlyout",
  ...defineStorybookActionsAndVModels({
    component: OnyxFlyout,
    events: ["update:modelValue"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxFlyout>;

/**
 * This examples shows a default single select flyout.
 */
export const Default = {
  args: {
    label: "Example label",
    options: Array.from({ length: 25 }, (_, index) => {
      const id = index + 1;
      const disabled = id === 3 || id === 4;

      return {
        id: id,
        label: `${disabled ? "Disabled" : "Test"} option ${id}`,
        disabled,
      };
    }),
  },
} satisfies Story;
