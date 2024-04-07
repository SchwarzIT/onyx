import {
  createIconSourceCodeTransformer,
  createTruncationDecorator,
  defineIconSelectArgType,
} from "@/utils/storybook";
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
  decorators: [
    (story) => ({
      components: { story },
      template: `
    <div class="onyx-text" style="font-family: var(--onyx-font-family);">
      <story />
    </div>`,
    }),
  ],
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
    variation: "secondary",
  },
} satisfies Story;

/**
 * This example shows the tag in danger color
 */
export const Danger = {
  args: {
    label: "Tag",
    variation: "danger",
  },
} satisfies Story;

/**
 * This example shows the tag in warning color
 */
export const Warning = {
  args: {
    label: "Tag",
    variation: "warning",
  },
} satisfies Story;

/**
 * This example shows the tag in success color
 */
export const Success = {
  args: {
    label: "Tag",
    variation: "success",
  },
} satisfies Story;

/**
 * This example shows the tag in info color
 */
export const Info = {
  args: {
    label: "Tag",
    variation: "info",
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
