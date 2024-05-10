import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxMiniSearch from "./OnyxMiniSearch.vue";

/**
 * The listbox is a fundamental element utilized across various components such as
 * dropdowns, navigation bars, paginations, tables, etc.
 * It provides the users with the ability to open a small modal window,
 * facilitating single or multi-selection based on the context in which it is employed.
 *
 * ### Keyboard shortcuts
 * The following keyboard shortcuts are available:
 * - **Tab**: Focuses / blurs the listbox
 * - **Arrow down**: Focuses the next option
 * - **Arrow up**: Focuses the previous option
 * - **Home**: Focuses the first option
 * - **End**: Focuses the last option
 * - **Space**: Selects currently focused option
 * - **Other characters**: Focuses first option that starts with the pressed key
 */
const meta: Meta<typeof OnyxMiniSearch> = {
  title: "support/MiniSearch",
  ...defineStorybookActionsAndVModels({
    component: OnyxMiniSearch,
    events: [],
    argTypes: {},
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxMiniSearch>;

/**
 * This example shows a default single select listbox.
 */
export const Default = {
  args: {},
} satisfies Story;
