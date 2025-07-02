import settings from "@sit-onyx/icons/settings.svg?raw";
import type { Meta, StoryObj } from "@storybook/vue3";
import type { AriaAttributes } from "vue";
import { defineIconSelectArgType } from "../../utils/storybook.js";
import OnyxSelectOption from "./OnyxSelectOption.vue";

/**
 * The select option is only intended to be used within the `OnyxSelect` component.
 */
const meta: Meta<typeof OnyxSelectOption> = {
  title: "Support/SelectOption",
  component: OnyxSelectOption,
  argTypes: {
    default: { control: { type: "text" } },
    icon: defineIconSelectArgType(),
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `<div style="max-width: 16rem;"> <story /> </div>`,
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof OnyxSelectOption> & { args: AriaAttributes };

export const Default = {
  args: {
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

export const Indeterminate = {
  args: {
    ...Multiple.args,
    indeterminate: true,
  },
} satisfies Story;

export const WithIcon = {
  args: {
    ...Default.args,
    icon: settings,
  },
} satisfies Story;
