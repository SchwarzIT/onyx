import type { Meta, StoryObj } from "@storybook/vue3";
import Component from "./BrowsersTable.vue";

const meta: Meta<typeof Component> = {
  title: "BrowsersTable",
  component: Component,
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default = {
  args: {
    browsers: [
      {
        coverage: 90,
        id: "chrome",
        name: "Google Chrome",
        versions: {
          "78.0.3904.108": 78,
          "78.0.3904.116": 78,
          "78.0.3904.132": 78,
        },
      },
      {
        coverage: 80,
        id: "firefox",
        name: "Mozilla Firefox",
        versions: {
          "75.0": 75,
          "76.0": 76,
          "77.0": 77,
        },
      },
    ],
  },
} satisfies Story;
