import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxPagination from "./OnyxPagination.vue";

/**
 * Pagination can be used in cases where a lot of data exists that should not be shown or loaded all at once.
 * The user can select a page for which data should be shown, e.g. inside a [table](/docs/data-table--docs).
 */
const meta: Meta<typeof OnyxPagination> = {
  title: "Data/Pagination",
  ...defineStorybookActionsAndVModels({
    component: OnyxPagination,
    events: ["update:modelValue"],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="padding-bottom: 20rem;"> <story /> </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxPagination>;

export const Default = {
  args: {
    modelValue: 1,
    pages: 42,
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
} satisfies Story;
