import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../utils/storybook.js";
import OnyxEditLinkDialog from "./OnyxEditLinkDialog.vue";

const meta: Meta<typeof OnyxEditLinkDialog> = {
  title: "Support/EditLinkDialog",
  component: OnyxEditLinkDialog,
  tags: ["unstable"],
};

export default meta;
type Story = StoryObj<typeof OnyxEditLinkDialog>;

export const Default = createAdvancedStoryExample(
  "OnyxEditLinkDialog",
  "DefaultExample",
) satisfies Story;
