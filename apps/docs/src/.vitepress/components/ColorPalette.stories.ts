import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import ColorPalette from "./ColorPalette.vue";

const meta: Meta<typeof ColorPalette> = {
  title: "components/ColorPalette",
  ...defineStorybookActionsAndVModels({
    component: ColorPalette,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof ColorPalette>;

export const Default = {
  args: {
    name: "primary",
  },
} satisfies Story;
