import type { Meta, StoryObj } from "@storybook/vue3-vite";
import OnyxItemsPerPage from "./OnyxItemsPerPage.vue";

/**
 * The items per page component allows users to select how many items are displayed per page in a paginated list or table.
 */
const meta: Meta<typeof OnyxItemsPerPage> = {
  title: "Data/ItemsPerPage",
  component: OnyxItemsPerPage,
  tags: ["unstable"],
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="max-width: 24rem"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxItemsPerPage>;

export const Default = {
  args: {
    modelValue: 5,
    options: [5, 10, 20, 30, 40, 75],
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;

export const RightAlignedLabel = {
  args: {
    ...Default.args,
    labelAlignment: "right",
  },
} satisfies Story;
