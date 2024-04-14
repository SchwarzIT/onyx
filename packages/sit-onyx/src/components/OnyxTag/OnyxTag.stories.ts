import {
  createIconSourceCodeTransformer,
  createTruncationDecorator,
  defineIconSelectArgType,
} from "../../utils/storybook";
import xIcon from "@sit-onyx/icons/x.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxTag from "./OnyxTag.vue";

/**
 * Tags are succinct textual labels that provide single-worded information or hints to their related parent element.
 */
const meta: Meta<typeof OnyxTag> = {
  title: "components/OnyxTag",
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
 * This example shows the tag in primary color
 */
export const Primary = {
  args: {
    label: "Tag",
  },
} satisfies Story;

/**
 * This example shows the tag in secondary color
 */
export const Secondary = {
  args: {
    label: "Tag",
    color: "secondary",
  },
} satisfies Story;

/**
 * This example shows the tag in neutral color
 */
export const Neutral = {
  args: {
    label: "Tag",
    color: "neutral",
  },
} satisfies Story;

/**
 * This example shows the tag in danger color
 */
export const Danger = {
  args: {
    label: "Tag",
    color: "danger",
  },
} satisfies Story;

/**
 * This example shows the tag in warning color
 */
export const Warning = {
  args: {
    label: "Tag",
    color: "warning",
  },
} satisfies Story;

/**
 * This example shows the tag in success color
 */
export const Success = {
  args: {
    label: "Tag",
    color: "success",
  },
} satisfies Story;

/**
 * This example shows the tag in info color
 */
export const Info = {
  args: {
    label: "Tag",
    color: "info",
  },
} satisfies Story;

/**
 * This example shows the tag with icon
 */
export const WithIcon = {
  args: {
    label: "Tag",
    icon: xIcon,
  },
} satisfies Story;

/**
 * This example shows the tag with truncation.
 */
export const WithTruncation = {
  args: {
    label: "Button with a very long text that gets truncated",
  },
  decorators: createTruncationDecorator("6rem"),
} satisfies Story;
