import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import RoadmapCard from "./RoadmapCard.vue";

const meta: Meta<typeof RoadmapCard> = {
  title: "roadmap/RoadmapCard",
  ...defineStorybookActionsAndVModels({
    component: RoadmapCard,
    events: [],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="width: 16rem;"> <story /> </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof RoadmapCard>;

export const Default = {
  args: {
    title: "Title",
    description: "Test description",
  },
} satisfies Story;

export const WithLink = {
  args: {
    ...Default.args,
    href: "#",
  },
} satisfies Story;
