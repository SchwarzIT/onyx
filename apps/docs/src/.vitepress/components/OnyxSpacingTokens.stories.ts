import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxSpacingTokens from "./OnyxSpacingTokens.vue";

const meta: Meta<typeof OnyxSpacingTokens> = {
  title: "tokens/OnyxSpacingTokens",
  component: OnyxSpacingTokens,
};

export default meta;
type Story = StoryObj<typeof OnyxSpacingTokens>;

export const Default = { args: {} } satisfies Story;
