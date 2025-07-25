import type { Meta, StoryObj } from "@storybook/vue3-vite";
import TopicOverviewCard from "./TopicOverviewCard.vue";

const meta: Meta<typeof TopicOverviewCard> = {
  title: "TopicOverviewCard",
  component: TopicOverviewCard,
};

export default meta;
type Story = StoryObj<typeof TopicOverviewCard>;

export const Default = {
  args: {
    title: "Title",
    subtitle: "Subtitle",
    imageSrc: "https://picsum.photos/128",
    href: "#",
  },
} satisfies Story;
