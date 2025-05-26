import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxFileUpload from "./OnyxFileUpload.vue";

const meta: Meta<typeof OnyxFileUpload> = {
  title: "Form Elements/FileUpload",
  component: OnyxFileUpload,
  tags: ["new:component"],
};

export default meta;
type Story = StoryObj<typeof OnyxFileUpload>;

export const Default = {
  args: {
    maxSize: "4Mi",
    accept: [".jpg", ".png", ".mp4"],
    style: "width: 32rem",
  },
} satisfies Story;

export const Multiple = {
  args: {
    ...Default.args,
    multiple: true,
    maxCount: 42,
    maxTotalSize: "128Mi",
  },
} satisfies Story;
