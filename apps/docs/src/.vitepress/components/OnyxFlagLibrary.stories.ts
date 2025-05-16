import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxFlagLibrary from "./OnyxFlagLibrary.vue";

const meta: Meta<typeof OnyxFlagLibrary> = {
  title: "Asset library/OnyxFlagLibrary",
  component: OnyxFlagLibrary,
};

export default meta;
type Story = StoryObj<typeof OnyxFlagLibrary>;

export const Default = { args: {} } satisfies Story;
