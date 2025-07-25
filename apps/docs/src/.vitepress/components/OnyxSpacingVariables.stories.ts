import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxSpacingVariables from "./OnyxSpacingVariables.vue";

const meta: Meta<typeof OnyxSpacingVariables> = {
  title: "variables/OnyxSpacingVariables",
  component: OnyxSpacingVariables,
};

export default meta;
type Story = StoryObj<typeof OnyxSpacingVariables>;

export const Default = { args: {} } satisfies Story;
