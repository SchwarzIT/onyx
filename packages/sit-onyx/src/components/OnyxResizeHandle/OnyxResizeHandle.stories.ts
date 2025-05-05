import type { Meta, StoryObj } from "@storybook/vue3";
import { createAdvancedStoryExample, textColorDecorator } from "../../utils/storybook";
import OnyxResizeHandle from "./OnyxResizeHandle.vue";

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
