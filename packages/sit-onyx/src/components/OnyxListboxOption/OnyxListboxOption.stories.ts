import settings from "@sit-onyx/icons/settings.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import type { AriaAttributes } from "vue";
import {
  createIconSourceCodeTransformer,
  createTruncationDecorator,
  defineIconSelectArgType,
} from "../../utils/storybook";
import OnyxListboxOption from "./OnyxListboxOption.vue";

/**
 * The listbox option is only intended to be used within the listbox component.
 */
const meta: Meta<typeof OnyxListboxOption> = {
  title: "support/ListboxOption",
  ...defineStorybookActionsAndVModels({
    component: OnyxListboxOption,
    events: [],
    decorators: [createTruncationDecorator("16rem")],
    argTypes: {
      default: { control: { type: "text" } },
      icon: defineIconSelectArgType(),
    },
    parameters: {
      docs: {
        source: {
          // improve code snippet by adding the icon import
          transform: createIconSourceCodeTransformer("icon"),
        },
      },
    },
  }),
};

export default meta;
type Story = StoryObj<typeof OnyxListboxOption> & { args: AriaAttributes };

export const Default = {
  args: {
    id: "test-id",
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

export const WithIcon = {
  args: {
    ...Default.args,
    icon: settings,
  },
} satisfies Story;

export const Danger = {
  args: {
    ...Default.args,
    color: "danger",
  },
} satisfies Story;
