import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxNavSeparator from "./OnyxNavSeparator.vue";

/**
 * Separator for the context area of the `OnyxNavBar`.
 */
const meta: Meta<typeof OnyxNavSeparator> = {
  title: "Navigation/modules/NavSeparator",
  ...defineStorybookActionsAndVModels({
    component: OnyxNavSeparator,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxNavSeparator>;

export const Default = { args: {} } satisfies Story;
