import type { Meta, StoryObj } from "@storybook/vue3";
import { createAdvancedStoryExample, textColorDecorator } from "../../utils/storybook";
import OnyxResizeHandle from "./OnyxResizeHandle.vue";

/**
 * Support component to implement user resizable borders/components.
 * Currently this component is limited to only allow resizing the right border.
 *
 * Usage:
 * - drag border: resizes the component accordingly
 * - press "Escape" (while dragging): Cancels the current resizing and reverts the width back to the previous value
 * - double mouse click: Trigger auto-sizing (depends on the usage/implementation). Usually should set the component to some use-case specific value or reset the width back to the original one.
 */
const meta: Meta<typeof OnyxResizeHandle> = {
  title: "Support/ResizeHandle",
  component: OnyxResizeHandle,
  tags: ["new:component"],
  decorators: [
    textColorDecorator,
    (story) => ({
      components: { story },
      template: `<div style="font-family: var(--onyx-font-family)"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxResizeHandle>;

export const Default = createAdvancedStoryExample(
  "OnyxResizeHandle",
  "DefaultExample",
) satisfies Story;
