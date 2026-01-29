import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxTextEditor from "./OnyxTextEditor.vue";

const meta: Meta<typeof OnyxTextEditor> = {
  title: "TextEditor",
  component: OnyxTextEditor,
  argTypes: {
    toolbar: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxTextEditor>;

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
