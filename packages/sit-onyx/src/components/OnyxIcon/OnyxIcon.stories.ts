import { ONYX_COLORS, type OnyxIconProps } from "@/index";
import happyIcon from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import { defineStorybookActionsAndVModels } from "@sit-onyx/storybook-utils";
import type { Meta, StoryContext, StoryObj } from "@storybook/vue3";
import OnyxIcon from "./OnyxIcon.vue";
import { ICON_SIZES } from "./types";

const ALL_ICONS = import.meta.glob("../../../node_modules/@sit-onyx/icons/src/assets/*.svg", {
  as: "raw",
  eager: true,
});

/**
 * Mapping between icon SVG content (key) and icon name (value).
 * Needed to display a labelled dropdown list of all available icons.
 */
const iconLabels = Object.entries(ALL_ICONS).reduce<Record<string, string>>(
  (labels, [filePath, content]) => {
    labels[content] = filePath.split("/").at(-1)!.replace(".svg", "");
    return labels;
  },
  {},
);

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
      icon: {
        options: Object.keys(iconLabels),
        control: {
          type: "select",
          labels: iconLabels,
        },
      },
    },
  }),
  parameters: {
    docs: {
      source: {
        // improve code snippet by adding the icon import
        transform: (sourceCode: string, ctx: StoryContext) => {
          const iconName = iconLabels[ctx.args.icon as OnyxIconProps["icon"]];

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
