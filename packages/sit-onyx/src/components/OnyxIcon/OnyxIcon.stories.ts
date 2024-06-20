import happyIcon from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import { defineIconSelectArgType, textColorDecorator } from "../../utils/storybook";
import OnyxIcon from "./OnyxIcon.vue";

/**
 * Component to display icons. Supports all inline SVG icon libraries.
 * We recommend using the official icons from `@sit-onyx/icons`.
 *
 * When importing SVG icon files, make sure to add `?raw` after the file name as shown in the examples to import the SVG content
 * instead of the file system path to the file.
 */
const meta: Meta<typeof OnyxIcon> = {
  title: "Basic/Icon",
  ...defineStorybookActionsAndVModels({
    component: OnyxIcon,
    events: [],
    argTypes: {
      icon: defineIconSelectArgType(),
    },
  }),

  decorators: [textColorDecorator],
};

export default meta;
type Story = StoryObj<typeof OnyxIcon>;

/**
 * This example shows a default icon.
 */
export const Default = {
  args: {
    icon: happyIcon,
  },
} satisfies Story;

/**
 * This example shows an icon with a different size.
 */
export const WithSize = {
  args: {
    ...Default.args,
    size: "96px",
  },
} satisfies Story;

/**
 * This example shows an icon with a different color.
 */
export const WithColor = {
  args: {
    ...Default.args,
    color: "success",
  },
} satisfies Story;
