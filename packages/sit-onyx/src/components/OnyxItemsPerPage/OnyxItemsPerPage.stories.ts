import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxItemsPerPage from "./OnyxItemsPerPage.vue";

/**
 * The items per page component allows users to select how many items are displayed per page in a paginated list or table.
 */
const meta: Meta<typeof OnyxItemsPerPage> = {
  title: "Data/ItemsPerPage",
  component: OnyxItemsPerPage,
  tags: ["unstable"],
};

export default meta;
type Story = StoryObj<typeof OnyxItemsPerPage>;

export const Default = {
  args: {
    modelValue: 20,
    options: [10, 20, 30, 40, 50],
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;

export const LeftLabel = {
  args: {
    ...Default.args,
    labelAlignment: "left",
  },
} satisfies Story;
