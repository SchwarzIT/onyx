import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxIconLibrary from "./OnyxIconLibrary.vue";

const meta: Meta<typeof OnyxIconLibrary> = {
  title: "Asset library/OnyxIconLibrary",
  component: OnyxIconLibrary,
};

export default meta;
type Story = StoryObj<typeof OnyxIconLibrary>;

export const Default = { args: {} } satisfies Story;
