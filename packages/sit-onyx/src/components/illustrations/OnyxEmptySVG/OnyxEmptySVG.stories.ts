import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxEmptySVG from "./OnyxEmptySVG.vue";

const meta: Meta<typeof OnyxEmptySVG> = {
  title: "Illustrations/EmptySVG",
  component: OnyxEmptySVG,
};

export default meta;
type Story = StoryObj<typeof OnyxEmptySVG>;

export const Default = {
  args: {
    style: "max-width: 32rem",
  },
} satisfies Story;
