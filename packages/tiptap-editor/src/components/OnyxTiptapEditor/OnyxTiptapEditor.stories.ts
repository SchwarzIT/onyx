import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxTiptapEditor from "./OnyxTiptapEditor.vue";

const meta: Meta<typeof OnyxTiptapEditor> = {
  title: "TiptapEditor",
  component: OnyxTiptapEditor,
  argTypes: {
    toolbar: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxTiptapEditor>;

export const Default = {
  args: {
    label: "Example editor",
  },
} satisfies Story;

export const BottomToolbar = {
  args: {
    ...Default.args,
    toolbar: { position: "bottom" },
  },
} satisfies Story;
