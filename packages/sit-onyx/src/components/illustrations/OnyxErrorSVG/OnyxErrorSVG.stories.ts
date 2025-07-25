import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxErrorSVG from "./OnyxErrorSVG.vue";

const meta: Meta<typeof OnyxErrorSVG> = {
  title: "Illustrations/ErrorSVG",
  component: OnyxErrorSVG,
};

export default meta;
type Story = StoryObj<typeof OnyxErrorSVG>;

export const Default = {
  args: {
    style: "max-width: 32rem",
  },
} satisfies Story;
