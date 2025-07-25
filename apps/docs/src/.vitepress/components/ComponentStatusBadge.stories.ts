import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ComponentStatusBadge from "./ComponentStatusBadge.vue";

const meta: Meta<typeof ComponentStatusBadge> = {
  title: "roadmap/ComponentStatusBadge",
  component: ComponentStatusBadge,
};

export default meta;
type Story = StoryObj<typeof ComponentStatusBadge>;

export const Implemented = {
  args: {
    status: "implemented",
    showLabel: true,
  },
} satisfies Story;

export const InProgress = {
  args: {
    status: "in-progress",
    showLabel: true,
  },
} satisfies Story;

export const Planned = {
  args: {
    status: "planned",
    showLabel: true,
  },
} satisfies Story;
