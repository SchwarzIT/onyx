import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxSeparator from "./OnyxSeparator.vue";

/**
 * Separator for the context area of the `OnyxNavBar`.
 */
const meta: Meta<typeof OnyxSeparator> = {
  title: "support/Separator",
  ...defineStorybookActionsAndVModels({
    component: OnyxSeparator,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxSeparator>;

export const Default = { args: {} } satisfies Story;
