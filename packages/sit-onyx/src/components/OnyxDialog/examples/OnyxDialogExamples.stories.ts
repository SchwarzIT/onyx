import type { Meta } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../../utils/storybook.js";
import OnyxDialog from "../OnyxDialog.vue";

const meta: Meta<typeof OnyxDialog> = {
  title: "Feedback/Dialog/Examples",
  component: OnyxDialog,
  tags: ["!autodocs"],
  argTypes: {
    style: { table: { disable: true } },
    default: { control: { disable: true } },
  },
};

export default meta;

export const Description = createAdvancedStoryExample("OnyxDialog", "DescriptionExample");
export const Support = createAdvancedStoryExample("OnyxDialog", "SupportExample");
export const URL = createAdvancedStoryExample("OnyxDialog", "URLExample");
