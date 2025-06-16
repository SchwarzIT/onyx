import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxFontsVariables from "./OnyxFontsVariables.vue";

const meta: Meta<typeof OnyxFontsVariables> = {
  title: "variables/OnyxBorderRadiusTokens",
  component: OnyxFontsVariables,
};

export default meta;
type Story = StoryObj<typeof OnyxFontsVariables>;

export const Default = { args: {} } satisfies Story;
