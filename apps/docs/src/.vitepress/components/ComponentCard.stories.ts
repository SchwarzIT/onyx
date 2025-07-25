import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ComponentCard from "./ComponentCard.vue";

const meta: Meta<typeof ComponentCard> = {
  title: "roadmap/ComponentCard",
  component: ComponentCard,
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="width: 16rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof ComponentCard>;

export const Implemented = {
  args: {
    name: "Component name",
    status: "implemented",
    href: "#",
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

export const WithoutDueDate = {
  args: {
    ...Planned.args,
  },
} satisfies Story;
