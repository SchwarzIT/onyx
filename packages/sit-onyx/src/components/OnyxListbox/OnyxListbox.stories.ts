import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxListbox from "./OnyxListbox.vue";

/**
 * The listbox is a fundamental element utilized across various components such as
 * dropdowns, navigation bars, paginations, tables, etc.
 * It provides the users with the ability to open a small modal window,
 * facilitating single or multi-selection based on the context in which it is employed.
 */
const meta: Meta<typeof OnyxListbox> = {
  title: "support/OnyxListbox",
  ...defineStorybookActionsAndVModels({
    component: OnyxListbox,
    events: ["update:modelValue"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxListbox>;

/**
 * This examples shows a default single select listbox.
 */
export const Default = {
  args: {
    label: "Example label",
    options: Array.from({ length: 25 }, (_, index) => {
      const id = index + 1;
      return {
        id: id,
        label: `Test option ${id}`,
      };
    }),
  },
} satisfies Story;
