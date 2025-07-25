import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxFlagLibrary from "./OnyxFlagLibrary.vue";

const meta: Meta<typeof OnyxFlagLibrary> = {
  title: "Assets/OnyxFlagLibrary",
  component: OnyxFlagLibrary,
};

export default meta;
type Story = StoryObj<typeof OnyxFlagLibrary>;

export const Default = { args: {} } satisfies Story;
