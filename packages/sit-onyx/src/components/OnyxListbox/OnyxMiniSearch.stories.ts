import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxMiniSearch from "./OnyxMiniSearch.vue";

/**
 * The MiniSearch is intended to be used inside of the Listbox for filtering of elements.
 */
const meta: Meta<typeof OnyxMiniSearch> = {
  title: "support/MiniSearch",
  ...defineStorybookActionsAndVModels({
    component: OnyxMiniSearch,
    events: ["update:modelValue", "clear"],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxMiniSearch>;

export const Default = { args: {} } satisfies Story;

export const WithValue = {
  args: {
    modelValue: "Test value",
  },
} satisfies Story;
