import { type OnyxIconProps } from "@/index";
import { defineIconSelectArgType } from "@/utils/storybook";
import happyIcon from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryContext, StoryObj } from "@storybook/vue3";
import OnyxIcon from "./OnyxIcon.vue";

const iconArgType = defineIconSelectArgType();

/**
 * Component to display icons. Supports all inline SVG icon libraries.
 * We recommend using the official icons from `@sit-onyx/icons`.
 *
 * When importing SVG icon files, make sure to add `?raw` after the file name as shown in the examples to import the SVG content
 * instead of the file system path to the file.
 */
const meta: Meta<typeof OnyxIcon> = {
  title: "components/OnyxIcon",
  ...defineStorybookActionsAndVModels({
    component: OnyxIcon,
    events: [],
    argTypes: {
      icon: iconArgType,
    },
  }),
  parameters: {
    docs: {
      source: {
        // improve code snippet by adding the icon import
        transform: (sourceCode: string, ctx: StoryContext) => {
          const iconName = iconArgType.control.labels[ctx.args.icon as OnyxIconProps["icon"]];

          return `<script lang="ts" setup>
          import icon from "@sit-onyx/icons/${iconName}.svg?raw";
          </script>
          ${sourceCode.replace("icon='()=>({})'", ':icon="icon"')}`;
        },
      },
    },
  },
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
