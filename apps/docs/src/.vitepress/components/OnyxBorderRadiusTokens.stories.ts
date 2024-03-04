import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxBorderRadiusTokens from "./OnyxBorderRadiusTokens.vue";

const meta: Meta<typeof OnyxBorderRadiusTokens> = {
  title: "tokens/OnyxBorderRadiusTokens",
  ...defineStorybookActionsAndVModels({
    component: OnyxBorderRadiusTokens,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxBorderRadiusTokens>;

export const Default = { args: {} } satisfies Story;
