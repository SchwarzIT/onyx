import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxShadowVariables from "./OnyxShadowVariables.vue";

const meta: Meta<typeof OnyxShadowVariables> = {
  title: "variables/OnyxShadowVariables",
  component: OnyxShadowVariables,
};

export default meta;
type Story = StoryObj<typeof OnyxShadowVariables>;

export const Default = { args: {} } satisfies Story;
