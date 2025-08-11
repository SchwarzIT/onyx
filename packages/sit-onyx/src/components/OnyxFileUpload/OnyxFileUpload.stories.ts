import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxFileUpload from "./OnyxFileUpload.vue";

const meta: Meta<typeof OnyxFileUpload> = {
  title: "Form Elements/FileUpload",
  component: OnyxFileUpload,
};

export default meta;
type Story = StoryObj<typeof OnyxFileUpload>;

export const Default = {
  args: {
    maxSize: "4MiB",
    accept: [".jpg", ".png", ".mp4"],
    style: "width: 30rem",
  },
} satisfies Story;

export const Medium = {
  args: {
    ...Default.args,
    size: "medium",
  },
} satisfies Story;

export const Small = {
  args: {
    ...Default.args,
    size: "small",
  },
} satisfies Story;

export const Multiple = {
  args: {
    ...Default.args,
    multiple: true,
    maxCount: 42,
    maxTotalSize: "128MiB",
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;

export const MaxHeight = {
  args: {
    ...Default.args,
    multiple: true,
    listType: "maxHeight",
  },
} satisfies Story;
export const HideButton = {
  args: {
    ...Default.args,
    multiple: true,
    listType: "button",
  },
} satisfies Story;
