import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxTiptapEditor from "./OnyxTiptapEditor.vue";

const meta: Meta<typeof OnyxTiptapEditor> = {
  title: "TiptapEditor",
  component: OnyxTiptapEditor,
};

export default meta;
type Story = StoryObj<typeof OnyxTiptapEditor>;

export const Default = { args: {} } satisfies Story;
