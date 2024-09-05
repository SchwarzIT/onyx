import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxShadowTokens from "./OnyxShadowTokens.vue";

const meta: Meta<typeof OnyxShadowTokens> = {
  title: "tokens/OnyxShadowTokens",
  component: OnyxShadowTokens,
};

export default meta;
type Story = StoryObj<typeof OnyxShadowTokens>;

export const Default = { args: {} } satisfies Story;
