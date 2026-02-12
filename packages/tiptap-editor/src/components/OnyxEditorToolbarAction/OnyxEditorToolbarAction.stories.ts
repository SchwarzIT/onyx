import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxEditorToolbarAction from "./OnyxEditorToolbarAction.vue";

const meta: Meta<typeof OnyxEditorToolbarAction> = {
  title: "Support/EditorToolbarAction",
  component: OnyxEditorToolbarAction,
};

export default meta;
type Story = StoryObj<typeof OnyxEditorToolbarAction>;

export const Default = {
  args: {
    label: "Example action",
    icon: iconPlaceholder,
  },
} satisfies Story;

export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;
