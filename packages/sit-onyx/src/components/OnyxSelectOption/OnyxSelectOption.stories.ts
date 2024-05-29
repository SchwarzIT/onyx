import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import type { AriaAttributes } from "vue";
import { createTruncationDecorator } from "../../utils/storybook";
import OnyxSelectOption from "./OnyxSelectOption.vue";

/**
 * The select option is only intended to be used within the `OnyxSelect` component.
 */
const meta: Meta<typeof OnyxSelectOption> = {
  title: "support/SelectOption",
  ...defineStorybookActionsAndVModels({
    component: OnyxSelectOption,
    events: [],
    decorators: [createTruncationDecorator("16rem")],
    argTypes: {
      default: { control: { type: "text" } },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxSelectOption> & { args: AriaAttributes };

export const Default = {
  args: {
    "aria-label": "Example option",
    default: "Example option",
  },
} satisfies Story;

export const Active = {
  args: {
    ...Default.args,
    active: true,
  },
} satisfies Story;

export const Selected = {
  args: {
    ...Default.args,
    "aria-selected": true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    ...Default.args,
    "aria-disabled": true,
  },
} satisfies Story;

export const Multiple = {
  args: {
    ...Default.args,
    multiple: true,
  },
} satisfies Story;

export const Danger = {
  args: {
    ...Default.args,
    color: "danger",
  },
} satisfies Story;
