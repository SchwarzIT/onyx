import type { Meta, StoryObj } from "@storybook/vue3-vite";
import RoadmapCard from "./RoadmapCard.vue";

const meta: Meta<typeof RoadmapCard> = {
  title: "roadmap/RoadmapCard",
  component: RoadmapCard,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 16rem;"> <story /> </div>`,
    }),
  ],
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
