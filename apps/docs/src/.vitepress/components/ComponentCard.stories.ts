import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import ComponentCard from "./ComponentCard.vue";

const meta: Meta<typeof ComponentCard> = {
  title: "roadmap/ComponentCard",
  ...defineStorybookActionsAndVModels({
    component: ComponentCard,
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
type Story = StoryObj<typeof ComponentCard>;

export const Implemented = {
  args: {
    name: "Component name",
    status: "implemented",
    href: "#",
    dueDate: new Date(),
  },
} satisfies Story;

export const InProgress = {
  args: {
    ...Implemented.args,
    status: "in-progress",
  },
} satisfies Story;

export const Planned = {
  args: {
    ...Implemented.args,
    status: "planned",
  },
} satisfies Story;
