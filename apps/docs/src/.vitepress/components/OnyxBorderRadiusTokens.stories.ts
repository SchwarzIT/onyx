import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxBorderRadiusTokens from "./OnyxBorderRadiusTokens.vue";

const meta: Meta<typeof OnyxBorderRadiusTokens> = {
  title: "tokens/OnyxBorderRadiusTokens",
  component: OnyxBorderRadiusTokens,
};

export default meta;
type Story = StoryObj<typeof OnyxBorderRadiusTokens>;

export const Default = { args: {} } satisfies Story;
