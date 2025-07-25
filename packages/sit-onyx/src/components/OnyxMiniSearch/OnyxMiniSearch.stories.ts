import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxMiniSearch from "./OnyxMiniSearch.vue";

/**
 * The MiniSearch is intended to be used inside of the select for filtering of elements.
 */
const meta: Meta<typeof OnyxMiniSearch> = {
  title: "Support/MiniSearch",
  component: OnyxMiniSearch,
};

export default meta;
type Story = StoryObj<typeof OnyxMiniSearch>;

export const Default = {
  args: {
    label: "Search",
  },
} satisfies Story;

export const WithValue = {
  args: {
    ...Default.args,
    modelValue: "Test value",
  },
} satisfies Story;
