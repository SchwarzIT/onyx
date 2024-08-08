import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxPagination from "./OnyxPagination.vue";

const meta: Meta<typeof OnyxPagination> = {
  title: "Data/Pagination",
  ...defineStorybookActionsAndVModels({
    component: OnyxPagination,
    events: ["update:modelValue"],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="padding-bottom: 12rem;"> <story /> </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxPagination>;

export const Default = {
  args: {
    modelValue: 0,
    pages: 42,
  },
} satisfies Story;
