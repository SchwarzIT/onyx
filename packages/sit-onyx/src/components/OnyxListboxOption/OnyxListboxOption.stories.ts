import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxListboxOption from "./OnyxListboxOption.vue";

/**
 * Single option for the OnyxListbox. **FOR INTERNAL USE ONLY!**
 */
const meta: Meta<typeof OnyxListboxOption> = {
  title: "support/OnyxListboxOption",
  ...defineStorybookActionsAndVModels({
    component: OnyxListboxOption,
    events: [],
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxListboxOption>;

export const Default = {
  args: {
    headlessOption: {
      "aria-label": "Test label",
      role: "option",
      tabindex: "0",
      "aria-checked": undefined,
      "aria-selected": false,
      "aria-disabled": false,
      onKeydown: () => undefined,
      onClick: () => undefined,
    },
  },
} satisfies Story;

export const Selected = {
  args: {
    headlessOption: {
      ...Default.args.headlessOption,
      "aria-selected": true,
    },
  },
} satisfies Story;

export const Disabled = {
  args: {
    headlessOption: {
      ...Default.args.headlessOption,
      "aria-disabled": true,
    },
  },
} satisfies Story;
