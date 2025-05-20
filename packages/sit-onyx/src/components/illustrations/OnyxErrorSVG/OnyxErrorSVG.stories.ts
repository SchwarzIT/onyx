import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxErrorSVG from "./OnyxErrorSVG.vue";

const meta: Meta<typeof OnyxErrorSVG> = {
  title: "Illustrations/ErrorSVG",
  component: OnyxErrorSVG,
  tags: ["new:component"],
};

export default meta;
type Story = StoryObj<typeof OnyxErrorSVG>;

export const Default = {
  args: {
    style: "max-width: 32rem",
  },
} satisfies Story;
