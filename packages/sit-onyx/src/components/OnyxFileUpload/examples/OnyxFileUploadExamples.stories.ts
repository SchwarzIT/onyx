import type { Meta } from "@storybook/vue3-vite";
import { createAdvancedStoryExample } from "../../../utils/storybook.js";
import OnyxFileUpload from "../OnyxFileUpload.vue";

const meta: Meta<typeof OnyxFileUpload> = {
  title: "Form Elements/FileUpload/Examples",
  component: OnyxFileUpload,
  tags: ["!autodocs"],
};

export default meta;

export const Actions = createAdvancedStoryExample("OnyxFileUpload", "FileUploadActionsExample");
export const Modal = createAdvancedStoryExample("OnyxFileUpload", "FileUploadModalExample");
