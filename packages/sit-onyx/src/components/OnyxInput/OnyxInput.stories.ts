import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxInput from "./OnyxInput.vue";

/**
 * Text inputs are essential UI elements where users can enter textual information.
 * These components play a fundamental role in facilitating user interactions and data input within applications and websites.
 */
const meta: Meta<typeof OnyxInput> = {
  title: "components/OnyxInput",
  ...defineStorybookActionsAndVModels({
    component: OnyxInput,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxInput>;

/**
 * This example shows a default input.
 */
export const Default = {
  args: {
    label: "Label",
  },
} satisfies Story;
