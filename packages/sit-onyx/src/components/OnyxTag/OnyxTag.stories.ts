import check from "@sit-onyx/icons/check.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import {
  createIconSourceCodeTransformer,
  createTruncationDecorator,
  defineIconSelectArgType,
} from "../../utils/storybook";
import OnyxTag from "./OnyxTag.vue";

/**
 * Tags are succinct textual labels that provide single-worded information or hints to their related parent element.
 */
const meta: Meta<typeof OnyxTag> = {
  title: "components/Tag",
  ...defineStorybookActionsAndVModels({
    component: OnyxTag,
    events: [],
    argTypes: {
      icon: defineIconSelectArgType(),
    },
  }),
  parameters: {
    docs: {
      source: {
        transform: createIconSourceCodeTransformer("icon"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnyxTag>;

/**
 * This example shows the tag in primary color.
 */
export const Primary = {
  args: {
    label: "Tag",
  },
} satisfies Story;

/**
 * This example shows the tag with an icon.
 */
export const WithIcon = {
  args: {
    label: "Done",
    icon: check,
    color: "success",
  },
} satisfies Story;

/**
 * This example shows the tag with truncation.
 */
export const WithTruncation = {
  args: {
    label: "Tag with a very long text that gets truncated",
  },
  decorators: createTruncationDecorator("10rem"),
} satisfies Story;
