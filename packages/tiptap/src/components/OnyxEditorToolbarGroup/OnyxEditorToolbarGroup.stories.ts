import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxEditorToolbarGroup from "./OnyxEditorToolbarGroup.vue";

/**
 * Support component to visually group related editor toolbar actions that are separated by vertical lines.
 */
const meta: Meta<typeof OnyxEditorToolbarGroup> = {
  title: "Support/EditorToolbarGroup",
  component: OnyxEditorToolbarGroup,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="margin-top: 2rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxEditorToolbarGroup>;

export const Default = createAdvancedStoryExample(
  "OnyxEditorToolbarGroup",
  "DefaultExample",
) satisfies Story;
