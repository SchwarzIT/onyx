import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxFontsVariables from "./OnyxFontsVariables.vue";

const meta: Meta<typeof OnyxFontsVariables> = {
  title: "variables/OnyxFontsVariables",
  component: OnyxFontsVariables,
};

export default meta;
type Story = StoryObj<typeof OnyxFontsVariables>;

export const Default = { args: {} } satisfies Story;
