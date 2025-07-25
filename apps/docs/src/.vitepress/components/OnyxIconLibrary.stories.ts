import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxIconLibrary from "./OnyxIconLibrary.vue";

const meta: Meta<typeof OnyxIconLibrary> = {
  title: "Assets/OnyxIconLibrary",
  component: OnyxIconLibrary,
};

export default meta;
type Story = StoryObj<typeof OnyxIconLibrary>;

export const Default = { args: {} } satisfies Story;
