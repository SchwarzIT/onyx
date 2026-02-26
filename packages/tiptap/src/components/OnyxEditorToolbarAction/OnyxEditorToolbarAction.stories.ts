import { iconPlaceholder } from "@sit-onyx/icons";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxEditorToolbarAction from "./OnyxEditorToolbarAction.vue";

/**
 * Support component for representing a single toolbar action of the text editor.
 * Will automatically be disabled when the editor is disabled.
 */
const meta: Meta<typeof OnyxEditorToolbarAction> = {
  title: "Support/EditorToolbarAction",
  component: OnyxEditorToolbarAction,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="margin: 2rem;"> <story /> </div>`,
    }),
  ],
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
