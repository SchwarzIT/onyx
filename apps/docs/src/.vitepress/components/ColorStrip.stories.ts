import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import ColorStrip from "./ColorStrip.vue";

const meta: Meta<typeof ColorStrip> = {
  title: "components/ColorStrip",
  ...defineStorybookActionsAndVModels({
    component: ColorStrip,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof ColorStrip>;

export const Default = {
  args: {
    colors: Array.from(
      { length: 9 },
      (_, index) => `var(--onyx-color-base-primary-${(index + 1) * 100})`,
    ),
    name: "Primary colors",
  },
} satisfies Story;

export const Vertical = {
  args: {
    ...Default.args,
    orientation: "horizontal",
  },
} satisfies Story;
