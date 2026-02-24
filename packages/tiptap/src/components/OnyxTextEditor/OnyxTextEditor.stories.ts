import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxTextEditor from "./OnyxTextEditor.vue";

/**
 * The text editor is used to allow the user to input text with additional formatting options / text styles such as bold, alignments, links etc.
 *
 * The `OnyxTextEditor` is based on the [Tiptap editor](https://tiptap.dev/docs/editor/getting-started/overview) so please refer to
 * their documentation for further information.
 */
const meta: Meta<typeof OnyxTextEditor> = {
  title: "Form Elements/TextEditor",
  component: OnyxTextEditor,
  argTypes: {
    actions: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxTextEditor>;

export const Default = {
  args: {
    label: "Example editor",
    message: "Example message",
    placeholder: "Type something...",
  },
} satisfies Story;

export const BottomToolbar = {
  args: {
    ...Default.args,
    toolbar: { position: "bottom" },
  },
} satisfies Story;

export const CustomizedStarterKit = createAdvancedStoryExample(
  "OnyxTextEditor",
  "StarterKitExample",
) satisfies Story;

export const CustomActions = createAdvancedStoryExample(
  "OnyxTextEditor",
  "CustomActionsExample",
) satisfies Story;
