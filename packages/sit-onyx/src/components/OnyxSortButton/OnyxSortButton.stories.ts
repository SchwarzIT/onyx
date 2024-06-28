import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxSortButton from "./OnyxSortButton.vue";

/**
 * Sort button that can be used in other components like the table to support sorting data.
 */
const meta: Meta<typeof OnyxSortButton> = {
  title: "Buttons/SortButton",
  ...defineStorybookActionsAndVModels({
    component: OnyxSortButton,
    events: ["update:modelValue"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxSortButton>;

export const Default = {
  args: {
    property: "firstName",
  },
} satisfies Story;

export const Ascending = {
  args: {
    ...Default.args,
    modelValue: { property: Default.args.property, order: "asc" },
  },
} satisfies Story;

export const Descending = {
  args: {
    ...Default.args,
    modelValue: { property: Default.args.property, order: "desc" },
  },
} satisfies Story;
