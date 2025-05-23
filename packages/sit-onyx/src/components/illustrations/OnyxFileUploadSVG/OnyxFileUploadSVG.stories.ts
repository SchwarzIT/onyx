import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxFileUploadSVG from "./OnyxFileUploadSVG.vue";

const meta: Meta<typeof OnyxFileUploadSVG> = {
  title: "Illustrations/FileUploadSVG",
  component: OnyxFileUploadSVG,
  tags: ["new:component"],
};

export default meta;
type Story = StoryObj<typeof OnyxFileUploadSVG>;

export const Default = { args: {} } satisfies Story;

export const Active = {
  args: {
    active: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;
