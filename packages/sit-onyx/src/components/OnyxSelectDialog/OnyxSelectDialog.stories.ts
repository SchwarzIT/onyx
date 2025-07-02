import type { Meta, StoryObj } from "@storybook/vue3";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxSelectDialog from "./OnyxSelectDialog.vue";

/**
 * Pre-built dialog where the user can select one value from a given list of options.
 * This component is e.g. internally used by the [OnyxColorSchemeDialog](/docs/navigation-navbar-modules-colorschemedialog--docs).
 *
 * ### Keyboard support
 *
 * - Arrow up/down: Select previous/next option
 * - Enter: Confirm selected color scheme
 * - Tab: Shift focus between options and cancel/apply button
 */
const meta: Meta<typeof OnyxSelectDialog> = {
  title: "Support/SelectDialog",
  component: OnyxSelectDialog,
};

export default meta;
type Story = StoryObj<typeof OnyxSelectDialog>;

export const Default = createAdvancedStoryExample(
  "OnyxSelectDialog",
  "DefaultExample",
) satisfies Story;
