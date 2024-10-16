import type { Meta, StoryObj } from "@storybook/vue3";
import ComponentShowcase from "./ComponentShowcase.vue";

const meta: Meta<typeof ComponentShowcase> = {
  title: "Examples/Component Showcase",
  component: ComponentShowcase,
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ComponentShowcase>;

export const Default = { args: {} } satisfies Story;
