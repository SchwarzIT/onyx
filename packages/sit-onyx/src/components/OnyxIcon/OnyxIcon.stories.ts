import { ONYX_COLORS } from "@/index";
import happyIcon from "@sit-onyx/icons/emojies/emoji_happy_1.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryObj } from "@storybook/vue3";
import OnyxIcon from "./OnyxIcon.vue";
import { ICON_SIZES } from "./types";

/**
 * Component to display icons. Supports all inline SVG icon libraries.
 * We recommend using the official icons from `@sit-onyx/icons`.
 */
const meta: Meta<typeof OnyxIcon> = {
  title: "components/OnyxIcon",
  ...defineStorybookActionsAndVModels({
    component: OnyxIcon,
    events: [],
    argTypes: {
      size: {
        options: ICON_SIZES,
      },
      color: {
        options: ["currentColor", ...ONYX_COLORS],
      },
    },
  }),
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
    size: "2xl",
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
