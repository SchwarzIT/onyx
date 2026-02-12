import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxEditorToolbarFlyout from "./OnyxEditorToolbarFlyout.vue";

const meta: Meta<typeof OnyxEditorToolbarFlyout> = {
  title: "EditorToolbarFlyout",
  component: OnyxEditorToolbarFlyout,
};

export default meta;
type Story = StoryObj<typeof OnyxEditorToolbarFlyout>;

export const Default = {
  args: {
    label: "Example action",
    icon: iconPlaceholder,
    options: [{ label: "Action 1" }, { label: "Action 2" }],
  },
} satisfies Story;

export const Active = {
  args: {
    ...Default.args,
    options: [...Default.args.options, { label: "Action 3", active: true }],
  },
} satisfies Story;
