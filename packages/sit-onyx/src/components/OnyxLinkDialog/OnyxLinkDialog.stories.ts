import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxLinkDialog from "./OnyxLinkDialog.vue";

const meta: Meta<typeof OnyxLinkDialog> = {
  title: "Support/LinkDialog",
  component: OnyxLinkDialog,
  tags: ["unstable"],
};

export default meta;
type Story = StoryObj<typeof OnyxLinkDialog>;

export const Default = createAdvancedStoryExample(
  "OnyxLinkDialog",
  "DefaultExample",
) satisfies Story;
