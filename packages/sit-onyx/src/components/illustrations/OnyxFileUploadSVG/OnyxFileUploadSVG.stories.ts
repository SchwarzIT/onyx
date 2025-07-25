import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxFileUploadSVG from "./OnyxFileUploadSVG.vue";

const meta: Meta<typeof OnyxFileUploadSVG> = {
  title: "Illustrations/FileUploadSVG",
  component: OnyxFileUploadSVG,
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
