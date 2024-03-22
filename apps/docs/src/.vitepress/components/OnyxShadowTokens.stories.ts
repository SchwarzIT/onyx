import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxShadowTokens from "./OnyxShadowTokens.vue";

const meta: Meta<typeof OnyxShadowTokens> = {
  title: "tokens/OnyxShadowTokens",
  ...defineStorybookActionsAndVModels({
    component: OnyxShadowTokens,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxShadowTokens>;

export const Default = { args: {} } satisfies Story;
