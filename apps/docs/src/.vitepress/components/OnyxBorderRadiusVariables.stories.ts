import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxBorderRadiusVariables from "./OnyxBorderRadiusVariables.vue";

const meta: Meta<typeof OnyxBorderRadiusVariables> = {
  title: "variables/OnyxBorderRadiusTokens",
  component: OnyxBorderRadiusVariables,
};

export default meta;
type Story = StoryObj<typeof OnyxBorderRadiusVariables>;

export const Default = { args: {} } satisfies Story;
