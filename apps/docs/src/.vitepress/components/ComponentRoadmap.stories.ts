import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ComponentRoadmap from "./ComponentRoadmap.vue";

const meta: Meta<typeof ComponentRoadmap> = {
  title: "roadmap/ComponentRoadmap",
  component: ComponentRoadmap,
};

export default meta;
type Story = StoryObj<typeof ComponentRoadmap>;

export const Default = {
  args: {
    components: Array.from({ length: 25 }, (_, index) => {
      const id = index + 1;
      return {
        name: `Component ${id}`,
        status: id % 2 === 0 ? "in-progress" : "implemented",
        href: "#",
      };
    }),
  },
} satisfies Story;
