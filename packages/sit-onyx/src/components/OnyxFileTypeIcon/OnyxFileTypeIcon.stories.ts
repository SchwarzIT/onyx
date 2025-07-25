import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxFileTypeIcon from "./OnyxFileTypeIcon.vue";

/**
 * An icon that shows an icon corresponding to a given file media type (e.g. PDF, images etc.).
 */
const meta: Meta<typeof OnyxFileTypeIcon> = {
  title: "Support/FileTypeIcon",
  component: OnyxFileTypeIcon,
  tags: ["new:component"],
};

export default meta;
type Story = StoryObj<typeof OnyxFileTypeIcon>;

export const Default = createAdvancedStoryExample(
  "OnyxFileTypeIcon",
  "DefaultExample",
) satisfies Story;
