import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { Default as SelectDefaultStory } from "../OnyxSelect/OnyxSelect.stories";
import OnyxSelectInput from "./OnyxSelectInput.vue";

/**
 * This is the select element.
 * Itself is readonly and only takes care of showing the selection.
 */
const meta: Meta<typeof OnyxSelectInput> = {
  title: "support/SelectInput",
  ...defineStorybookActionsAndVModels({
    component: OnyxSelectInput,
    events: ["click"],
    decorators: [
      (story) => ({
        components: { story },
        template: `<div style="width: 16rem;"> <story /> </div>`,
      }),
    ],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxSelectInput>;

const EXAMPLE_OPTIONS = SelectDefaultStory.args.options;

/**
 * This example shows an select. Nothing was selected yet.
 */
export const Default = {
  args: {
    label: "Fruits",
    placeholder: "Select your fruits",
  },
} satisfies Story;

/**
 * This example shows a single select with initial value.
 */
export const FilledSingleSelect = {
  args: {
    ...Default.args,
    selection: EXAMPLE_OPTIONS[0],
  },
} satisfies Story;

/**
 * This example shows a multi select with multiple initial items.
 * A summary of the items is displayed.
 */
export const FilledMultiSelect = {
  args: {
    ...Default.args,
    selection: EXAMPLE_OPTIONS.slice(0, 2),
  },
} satisfies Story;

/**
 * This example shows a multi select with multiple initial items.
 * A Preview of the items is displayed.
 */
export const FilledMultiSelectPreview = {
  args: {
    ...FilledMultiSelect.args,
    selection: EXAMPLE_OPTIONS.slice(0, 5),
    textMode: "preview",
  },
} satisfies Story;

/**
 * This example shows a required select.
 */
export const Required = {
  args: {
    ...Default.args,
    required: true,
  },
} satisfies Story;

/**
 * This example shows a disabled select that can not be edited and is therefore not included in any form data.
 */
export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
    selection: EXAMPLE_OPTIONS[0],
  },
} satisfies Story;

/**
 * This example shows a readonly select that can not be edited.
 */
export const Readonly = {
  args: {
    ...FilledSingleSelect.args,
    readonly: true,
  },
} satisfies Story;

/**
 * This example shows a loading select. User interaction is disabled while loading.
 */
export const Loading = {
  args: {
    ...Default.args,
    selection: EXAMPLE_OPTIONS[0],
    loading: true,
  },
} satisfies Story;

/**
 * This example shows a select input with a message / help text and a tooltip.
 */
export const WithMessage: Story = {
  args: {
    ...Default.args,
    message: "Example message",
    messageTooltip: "Additional info message",
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="padding-bottom: 2rem"> <story /> </div>`,
    }),
  ],
};

/**
 * This example shows a select input with info label tooltip.
 */
export const WithLabelTooltip: Story = {
  args: {
    ...Default.args,
    labelTooltip: "More information",
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="padding-top: 2rem"> <story /> </div>`,
    }),
  ],
};

/**
 * This example shows an select without a visual label.
 * For accessibility / screen readers it must still be passed.
 */
export const HiddenLabel = {
  args: {
    ...Default.args,
    hideLabel: true,
  },
} satisfies Story;

/**
 * This example shows a skeleton select.
 */
export const Skeleton = {
  args: {
    ...Default.args,
    skeleton: true,
  },
} satisfies Story;
