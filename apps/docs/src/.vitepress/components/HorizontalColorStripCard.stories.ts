import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import HorizontalColorStripCard from "./HorizontalColorStripCard.vue";

const meta: Meta<typeof HorizontalColorStripCard> = {
  title: "colors/HorizontalColorStripCard",
  ...defineStorybookActionsAndVModels({
    component: HorizontalColorStripCard,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof HorizontalColorStripCard>;

export const Default = {
  args: {
    color: "info",
  },
} satisfies Story;
