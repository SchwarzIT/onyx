import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import TopicOverviewCard from "./TopicOverviewCard.vue";

const meta: Meta<typeof TopicOverviewCard> = {
  title: "TopicOverviewCard",
  ...defineStorybookActionsAndVModels({
    component: TopicOverviewCard,
    events: [],
  }),
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
