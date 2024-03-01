import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import Search from "./Search.vue";

const meta: Meta<typeof Search> = {
  title: "icons/Search",
  ...defineStorybookActionsAndVModels({
    component: Search,
    events: ["update:modelValue"],
  }),
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default = { args: {} } satisfies Story;

export const WithIntialValue = {
  args: {
    modelValue: "Lorem ipsum dolor sit amet",
  },
} satisfies Story;
